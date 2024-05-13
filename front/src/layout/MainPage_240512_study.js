import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import CardItem from "../Components/CardItem";
import { continents, prices } from "../utils/filterData";
import CheckBox from "../Components/CheckBox";
import SearchInp from "../Components/SearchInp";
import RadioBox from "../Components/RadioBox";

function MainPage() {
  // useStateSnippet 이용하면 더 쉽게 작성가능함
  const [products, setProducts] = useState([]);

  const limit = 4; // 글 리스트 한줄의 갯수 (products)?
  const [skip, setSkip] = useState(0); // skip은 나중에 더보기 버튼땜에 씀??????
  // ==== 인자에 대한 설명 1 ) 정의 되는게 첫번째 (선언과 초기화)
  const [hasMore, setHasMore] = useState(false); // 얘도 더보기......?
  const [filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  const [searchForm, setSearchForm] = useState("");

  // const fetchProducts = ({})=>{}
  const fetchProducts = async ({
    //===============하태민이틀림 여기부터임ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋzzzzzzㅋㅋㅋㅋㅋㅋㅋㅋ푸학
    skip, // 초기값 0, 4 들어간상황 ( 밑에서 useEffect에서 fetchProducts실행되면서 그 인자값이 여기로 들어왓음!)
    // handleLoadMore함수 실행 이후로는 skip = 0+4으로 매개변수 바뀜
    limit,
    loadMore = false, // handleLoadMore함수 실행 이후로는 true값으로 바뀐 후 실행될거임 함수
    filters = {}, // continents:[1]들어간상태
    // price는 [0,199]로 ㄷㄹ어감....ㅜㅜ
    searchForm = "", // 일단무시
  }) => {
    // ==== 인자에 대한 설명 3 ) 같은 함수명이니까!!! 여기에 있는 매개변수로 바뀐다(들어간다,대입된다...?)??? 함수에 있던 인자가.........
    const params = {
      // url /뒤에있는 :useid 이런값에 들어간다는의미
      // axios에 전달할 값 (params) => axiosInstance쪽에서 써먹음
      skip,
      // skip:skip, => 이거 바로위에서 인자에서 가져온거임!! 위에서 선언해준거 말고!!
      limit,
      filters, // continents:[1]들어간상태
      // price는 [0,199]로 ㄷㄹ어감....ㅜㅜ
      searchForm,
    };
    try {
      // await axiosInstance.get("/products?skip=0,limit=4",{}) 요런 형태라고 보면 된다
      // await axiosInstance.get("/products", { params }); // 원래 이형태엿는데 아직 백에서 params받을 준비 안되어있어서 일단 삭제했음
      const res = await axiosInstance.get("/products", { params }); //서버랑 통신하는거니까 api...:/
      // {params}인 이유는 여러개니까@
      // axiosInstance는 axios를 커스텀하는거임 (포트번호가 다르기때문????:/) =>
      // ajax가 =>페이지내에서 일정부분은 비동기처리 (데이터가 바뀌었을 때 새로고침하는게 아니라, 얘만 따로 바꿀 수 있도록) 해주는애인데
      // await axios~{params} 여기까지가 서버입장에선 req임!!!
      console.log(res.data.products);

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
    // 무조건 useEffect부터 봐야함 - 맨처음 랜더링 될 때 실행되니까
    // 얘는 초기값 불러올거임
    // =============!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!하태민이 여기서부터 시작이라고함.........
    fetchProducts({ skip, limit }); // 처음값은 여기서 실행하고 !!
    // 인자에 {} 들어가 있는거는 오브젝트형식으로 넣겠다는 의미??????
    // ==== 인자에 대한 설명 2 ) 함수에서 호출을 할 때 인자가 있으면 인자속의 값이 ---> 복사...된다......?-.-?????
    // 위에서 만든 함수랑 동일한 함수임(이름) -> 함수 호출 안해주면 하태민이 개욕함 - 호출을 해야 의미가 있음.
  }, []);

  function handleLoadMore() {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters,
      searchForm, // 무시
    };
    fetchProducts(body); // fetchProducts(body)로 인자값 body가 위쪽 함수의 인자로 복사해서 들어감 - 매개변수가 이걸로 바뀜! (콜바이밸류)
    setSkip(Number(skip) + Number(limit));
  }
  function handlefilters(newFilteredData, cate) {
    // console.log(newFilteredData);
    // handlefilters의 인자값으로 filters, "continents"가 복사돼서 들어옴!
    // newFilteredData가 CheckBox에서 온 newChecked
    // cate는 아까 "continents"라고 써있던거

    const newFilters = { ...filters };
    // newFilters.continents = newFilteredData;
    // newFilters["continents"] = newFilteredData;
    newFilters[cate] = newFilteredData;
    // newFilteredData에 지금 newChecked들어가있는상태 ㅜㅜ
    // cate에는 "continents"들어가잇는상태 ㅜㅜ - 쌍따옴표 빼지마셈
    // 오브젝트 객체에 접근하는 방법 2가지 있는데,
    // 1. _____.price 이런식으로 접근하는 방법
    // 2. ______["price"]이런식으로 접근하는 방법 이렇게 두개있음 (문법이니까 걍 외우셈 두개 똑같은의미임)
    //  => newFilters["continents"]인 상태인거임
    if (cate === "price") {
      const priceValues = handlePrice(newFilteredData);
      newFilters[cate] = priceValues;
    }

    showFilterResult(newFilters);
    // showFilterResult(continents:[1])인상태
    // 이거 이제 서버한테 보낼거임 개짜중남ㅡㅡ
    // 여기까지가 이제 백엔드에서 완료된거
    setFilters(newFilters);
    // 여기서 이제 프론트에서 set해준거...-.-?? 창훈이가 헷갈리게함 ㅡㅡ
  }

  function handlePrice(value) {
    let array = [];

    for (let key in prices) {
      //for -in문
      if (prices[key]._id === parseInt(value, 10)) {
        // 10진법
        array = prices[key].array;
      }
    }
    return array;
  }

  function showFilterResult(hataemin) {
    // function showFilterResult(newFilters) {

    console.log(hataemin);
    const body = {
      skip: 0,
      limit,
      // loadMore: true,
      // filters: filters
      filters: hataemin,
      // hataemin = [1]
      searchForm,
    };
    fetchProducts(body);
    // axios에 보냄????????????????????????
    setSkip(0);
  }

  function handleSearch(e) {
    console.log(e.target.value);
    // setSearchForm(e.target.value);
    // setSearchForm(e.target.value); // 이거 안써주면 콘솔에는 찍히는데, 인풋창에안올라옴
    const body = {
      skip: 0,
      limit,
      filters,
      searchForm: e.target.value,
    };
    fetchProducts(body);
    setSkip(0);
    setSearchForm(e.target.value);
  }

  return (
    <section>
      <h2>글 리스트</h2>
      {filters.price}
      {/* filter */}
      <div className="flex gap-3 mb-4">
        {/* <div className="w-1/2">checkbox</div> */}
        {/* <div className="w-full">checkbox</div> */}
        <div className="w-full px-2">
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
                // CheckBox.js의 onFilters의 인자 newChecked
                handlefilters(filters, "continents");
                // CheckBox.js의 onFilters의 인자 newChecked
                // 위에서 선언한 filters에서 continents만 갖다 씀
              }}
            />
          </div>
          <div>
            <RadioBox
              prices={prices}
              checkedPrice={filters.price}
              onFilters={(filters) => {
                handlefilters(filters, "price");
                // 위에서 선언한 filters에서 price만 갖다 씀
              }}
            />
          </div>
        </div>
        {/* <div className="w-1/2">radiobutton</div> */}
      </div>

      {/* search */}
      <div className="flex justify-end mb-3">
        <SearchInp searchForm={searchForm} onSearch={handleSearch} />
      </div>

      {/* products */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-3">
        {
          // products && products.map(()=>{return})
          products &&
            products.map((product) => {
              // 조건부 랜더링
              //&& => 트루이면 실행하라는 뜻 / 있으면
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
