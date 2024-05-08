import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import CardItem from "../Components/CardItem";

function MainPage() {
  // useStateSnippet
  const [products, setProducts] = useState([]);

  const limit = 4;
  const [skip, setSkip] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  // const fetchProducts = ({})=>{}
  const fetchProducts = async ({ skip, limit, loadMore = false }) => {
    const params = {
      // axios에 전달할 값 (params)
      skip,
      limit,
    };
    try {
      // await axiosInstance.get("/products?skip=0,limit=4",{}) 요런 형태라고 보면 된다
      // await axiosInstance.get("/products", { params }); // 원래 이형태엿는데 아직 백에서 params받을 준비 안되어있어서 일단 삭제했음
      const res = await axiosInstance.get("/products", { params });
      console.log(res.data);

      if (loadMore) {
        setProducts([...products, ...res.data.products]);
      } else {
        setProducts(res.data.products);
      }

      setHasMore(res.data.hasMore);
    } catch (error) {
      console.log(error);
    }
  }; // 초기데이터값을 인자로 가져올 땐 보통 중괄호{} 안에 넣는다..
  // fetchProducts({ skip:skip, limit:limit }); // 처음값은 여기서 실행하고 !!
  // useEffect(()=>{},[])
  useEffect(() => {
    fetchProducts({ skip, limit }); // 처음값은 여기서 실행하고 !!
  }, []);

  function handleLoadMore() {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
    };
    fetchProducts(body);
    setSkip(Number(skip) + Number(limit));
  }

  return (
    <section>
      <h2>글 리스트</h2>

      {/* filter */}
      <div className="flex gap-3">
        <div className="w-1/2">checkbox</div>
        <div className="w-1/2">radiobutton</div>
      </div>

      {/* search */}
      <div className="flex justify-end mb-3">search</div>

      {/* products */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {
          // products && products.map(()=>{return})
          products &&
            products.map((product) => {
              //&& => 트루이면 실행하라는 뜻
              // return <div>{product.title}</div>;
              return <CardItem product={product} key={product._id} />;
            })
        }
      </div>

      {/* more */}

      {/* {hasMore && () : } */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-400"
          >
            더보기
          </button>
        </div>
      )}
    </section>
  );
}

export default MainPage;
