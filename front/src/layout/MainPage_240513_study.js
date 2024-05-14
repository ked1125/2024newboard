import React, {useEffect, useState} from "react";
import CheckBox_240513_study from "../Components/CheckBox_240513_study";
import RadioBox_240513_study from "../Components/RadioBox_240513_study";
import CardItem_240513_study from "../Components/CardItem_240513_study";
import axiosInstance from "../utils/axios";
import {continents, prices} from "../utils/filterData";

function MainPage() {
    const [products, setProducts] = useState([])
    const limit = 4
    const [skip, setSkip] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    const [filters, setFilters] = useState({
        //  형태 일단 기억 해둘것!! continents와 price로 구성되어 있고, 두개 다 배열로, filter 안에 오브젝트형식으로 초기화되어있음..
        continents: [],
        price: []
    });
    const [searchForm, setSearchForm] = useState("")


    const fetchProducts = async
        ({ // 이상태로 인자값으로 들어가서 실행된다.
             skip, // 처음 함수 실행될 때 초기값 0 // 더보기버튼누른후엔 0+4가 저장되므로 4
             limit, // 처음 함수 실행될 때 초기값 4 // 더보기 버튼 누른 후에도 동일하게 4
             loadMore = false, // 더보기 누른 후에는 laodMore가 true 값으로 들어감 (콜바이밸류)
             // filters ={}
             searchForm = ""
         }) => {
        const params = { // params에 담아서
            skip, limit, filters, searchForm
        }
        try {
            const res = await axiosInstance.get("/products", {params})
            // req.body의 형태로 back단에 전달된다.
            console.log(res.data.products)
            if (loadMore) {
                setProducts([...products, ...res.data.products]);
                //     loadMore가 참인 경우는 더보기 버튼 한번 누른 이후 참으로 바뀌었을때이므로
                //   이전에 불러온 데이터에 새로운 데이터를 추가해서 정렬하는방식임. ...
            } else {
                setProducts(res.data.products)
            }
            setHasMore(res.data.hasMore)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchProducts({skip, limit})
    }, []);


    function handleLoadMore() {
        const body = {
            skip: skip + limit,
            limt,
            loadMore: true,
            filters,
            searchForm
        }
        fetchProducts(body)
        setSkip(Number(skip) + Number(limit));
    }


    return (
        <section>
            <h2>글 리스트</h2>
            {/*{filters.price}*/}
            <div className="flex gap-3 mb-4"></div>
            <div className="w-full px-2">
                <h3>지역선택</h3>
                <div>
                    <CheckBox_240513_study
                        {/* 지역이름과 관련된 필터고, 체크박스는 여러 선택지 중 여러가지 선택이 가능한 기능을 함*/}
                        continents={continents}
                        checkedContinents={filters.continents}
                        onFilters={(filters) => {
                            // CheckBox.js의 onFilters의 인자 newChecked
                            handlefilters(filters, "continents");
                            // CheckBox.js의 onFilters의 인자 newChecked
                            // 위에서 선언한 filters에서 continents만 갖다 씀
                        }}/>
                </div>
                <div>
                    <RadioBox_240513_study
                        // 가격과 관련된 필터고, 라디오버튼은 여러 선택지 중 단 하나만 선택하는 경우임
                        prices={prices}
                        checkedPrice={filters.price}
                        onFilters={(filters) => {
                            handlefilters(filters, "price");
                            // 위에서 선언한 filters에서 price만 갖다 씀
                        }}/>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-3">
                {
                    // products && products.map(()=>{return})
                    products &&
                    products.map((product) => {
                        // 조건부 랜더링
                        //&& => 트루이면 실행하라는 뜻 / 있으면
                        // return <div>{product.title}</div>;
                        return <CardItem_240513_study product={product} key={product._id}/>;
                    })
                }
            </div>
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
    )
}

export default MainPage;
