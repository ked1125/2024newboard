import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import CardItem from "../Components/CardItem";
import { continents, prices } from "../utils/filterData";
import CheckBox from "../Components/CheckBox";

function MainPage() {
  // useStateSnippet
  const [products, setProducts] = useState([]);

  const limit = 4;
  const [skip, setSkip] = useState(0);
  // ==== 인자에 대한 설명 1 ) 정의 되는게 첫번째 (선언과 초기화)
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  // const fetchProducts = ({})=>{}
  const fetchProducts = async ({
    skip,
    limit,
    loadMore = false,
    filters = {},
  }) => {
    // ==== 인자에 대한 설명 3 ) 같은 함수명이니까!!! 여기에 있는 매개변수로 바뀐다(들어간다,대입된다...?)??? 함수에 있던 인자가.........
    const params = {
      // axios에 전달할 값 (params)
      skip,
      // skip:skip,
      limit,
      filters,
    };
    try {
      // await axiosInstance.get("/products?skip=0,limit=4",{}) 요런 형태라고 보면 된다
      // await axiosInstance.get("/products", { params }); // 원래 이형태엿는데 아직 백에서 params받을 준비 안되어있어서 일단 삭제했음
      const res = await axiosInstance.get("/products", { params });
      console.log(res.data);

      if (loadMore) {
        setProducts([...products, ...res.data.products]);
        // back의 productRoute.js 의 __ .get("/")부분에 있는 res.status(200).send({products,hasMore})로 가져온값이
        // res.data.products임
        // res는 무조건 back에서 온다고 보면 쉽고 back에서 봤을 때 req.___ 로 req붙은건 front에서 보낸거임!!!
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
    // ==== 인자에 대한 설명 2 ) 함수에서 호출을 할 때 인자가 있으면 인자속의 값이 ---> 복사...된다......?-.-?????
    // 위에서 만든 함수랑 동일한 함수임(이름) -> 함수 호출 안해주면 하태민이 개욕함 - 호출을 해야 의미가 있음.
  }, []);

  function handleLoadMore() {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters,
    };
    fetchProducts(body);
    setSkip(Number(skip) + Number(limit));
  }
  function handlefilters(newFilteredData) {
    // console.log(newFilteredData);

    const newFilters = { ...filters };
    // newFilters.continents = newFilteredData;
    newFilters["continents"] = newFilteredData;

    showFilterResult(newFilters);
    setFilters(newFilters);
  }

  function showFilterResult(filters) {
    // function showFilterResult(newFilters) {

    console.log(filters);
    const body = {
      skip: 0,
      limit,
      // loadMore: true,
      // filters: filters
      filters,
    };
    fetchProducts(body);
    setSkip(0);
  }

  return (
    <section>
      <h2>글 리스트</h2>

      {/* filter */}
      <div className="flex gap-3">
        {/* <div className="w-1/2">checkbox</div> */}
        {/* <div className="w-full">checkbox</div> */}
        <div className="w-full py-2">
          <h3>지역선택</h3>
          {/* <div className="grid grid-cols-3 gap-4 sm:grid-cols-5"> */}
          {/* grid로 반응형만들기!!!😽 */}
          {/* <div className="flex gap-4 flex-wrap"> */}
          {/* <div className="flex gap-4"> */}
          {/* flex-wrap 안해주면 20%인데도 아래로 안떨어지고 계속 나눠져서 구간정해짐*/}
          {/* <div className="w-[100px] bg-slate-200">text</div> */}
          {/* <div className="w-[100%] bg-slate-200">text</div>
            <div className="w-[100%] bg-slate-200">text</div>
            <div className="w-[100%] bg-slate-200">text</div>
            <div className="w-[100%] bg-slate-200">text</div>
            <div className="w-[100%] bg-slate-200">text</div>
            <div className="w-[100%] bg-slate-200">text</div>
          </div> */}

          {/* ============강사님꺼 복사구간 start */}
          {/* <div className="flex gap-4 flex-wrap">
            <div className="w-[20%] bg-slate-200">text</div>
            <div className="w-[20%] bg-slate-200">text</div>
            <div className="w-[20%] bg-slate-200">text</div>
            <div className="w-[20%] bg-slate-200">text</div>
            <div className="w-[20%] bg-slate-200">text</div>
            <div className="w-[20%] bg-slate-200">text</div>
            <div className="w-[20%] bg-slate-200">text</div>
            <div className="w-[20%] bg-slate-200">text</div>
          </div> */}

          {/* <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
            <div className="w-[100%] bg-slate-200">text</div>
            <div className="w-[100%] bg-slate-200">text</div>
            <div className="w-[100%] bg-slate-200">text</div>
            <div className="w-[100%] bg-slate-200">text</div>
            <div className="w-[100%] bg-slate-200">text</div>
            <div className="w-[100%] bg-slate-200">text</div>
          </div> */}
          {/* ============강사님꺼 복사구간 end */}

          <div>
            <CheckBox
              continents={continents}
              checkedContinents={filters.continents}
              onFilters={(filters) => {
                handlefilters(filters);
              }}
            />
          </div>
        </div>
        {/* <div className="w-1/2">radiobutton</div> */}
      </div>

      {/* search */}
      <div className="flex justify-end mb-3">search</div>

      {/* products */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-3">
        {
          // products && products.map(()=>{return})
          products &&
            products.map((product) => {
              // 조건부 랜더링
              //&& => 트루이면 실행하라는 뜻
              // return <div>{product.title}</div>;
              return <CardItem product={product} key={product._id} />;
            })
        }
      </div>

      {/* more */}

      {/* {hasMore && () : } */}
      {hasMore && ( // html 태그 쓸 땐 소괄호 안에 넣어줘야 함!!
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
