const express = require("express");
const Product = require("../models/Product");
const productRouter = express.Router();
// Router -> 이정표 (길알려주는놈 표지판)

// productRouter.post();
// productRouter.get()
// productRouter.post("/", async (req, res) => {});
productRouter.post("/", async (req, res) => {
  try {
    const product = await new Product(req.body).save();
    // front의 PostWrite에서 온 body로 req.로 해서 옴 (여기서말하는 body는 header,body할때 body임.)
    // 모델 Product MVC 중 M 데이터관리
    // post니까 new로 새객체생성
    //  req.body가 입력한값인듯함.
    return res.status(200).send({ product });
    // 서버에서 res로 product담아서 front로 보내줌
  } catch (error) {
    console.log(error);
  }
});

// productRouter.get("/", async(req,res)=>{});
productRouter.get("/", async (req, res) => {
  // MainPage.js - front에서 axiosInstance params값으로 담아온애들 (req)
  // 삼항연산자들임!!!
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  //   있으면 좌측항 실행, 없으면 우측항 실행
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  //   있으면 좌측항 실행, 없으면 우측항 실행
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  // 웹 애플리케이션에서 데이터를 정렬하기 위한 쿼리의 일부분
  // 클라이언트가 정렬 기준을 지정할 수 있도록 하는 매개변수
  const order = req.query.order ? req.query.order : "desc";
  // desc -> 내림차순
  const search = req.query.searchForm;

  let findArgs = {};
  // 여기 빈배열에 continents들어갈거임.....&& 밑에 for...in 실행결과로
  // filters관련된값들임,,, continents, price
  // price --> radio버튼
  // continents --> checkbox버튼..

  for (let key in req.query.filters) {
    // front에서 MainPage.js통해서 params로 온거................
    // for -in 문
    // for...in 문은 JavaScript에서 객체의 속성을 열거할 때 사용되는 반복문
    // 객체의 속성을 하나씩 순회하면서 반복문의 코드 블록을 실행
    // object 데이터에서 key값을 가져올거임
    // continents:[1]이었으니까 key값이 continents
    // in~의 길이만큼 반복문해줄거임.....
    if (req.query.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.query.filters[key][0],
          // [0,199]가 들어간상태인데 그중 0번인덱스인 0을 비교해줄거임
          // great then equal? 크거나 같을 때 (이상일때)
          $lte: req.query.filters[key][1],
          // less then equal? 작거나 같을 때 (이하일때)
          // [0,199]가 들어간상태인데 그중 1번인덱스인 199을 비교해줄거임
        };
      } else {
        findArgs[key] = req.query.filters[key];
        // price아닌건 continents밖에 없으니까 continents가 findArgs[key]에 대입됨
      }
    }
  }

  // console.log(findArgs);
  console.log(search); // 무시

  if (search) {
    // 무시
    findArgs["$text"] = { $search: search };
    // findArgs["$text"] = {$search:search}; &search는 몽구스에서 쓰는 search
  }

  console.log(findArgs);
  try {
    // const products = await Product.find({});
    // const products = await Product.find({}).sort({ _id: -1 }); // 키:밸류형태 -1 : 최근 입력값이 제일 위에 나오는게 -1, 반대가 1
    const products = await Product.find(findArgs)
      // 얘가 하는게 checkbox관련된거임 ---> continents가 1인거 찾을거임
      // 데이터베이스가 SQL언어쓰는디......?/ .find얘가 쿼리로 바꿔줌.. db랑 통신할때..
      // mySQL에서는 ORM 자바언어로 통신함......?
      // 몽구스에있는 ODM?????임???????????????????????????
      // 데이터베이스에서 하나 찾아옴 (몽고디비에서)
      // Product가 model에서 옴 (Schema...?? 정확히는 모델이라고함 먼차이임 어이없음)
      //  MVC - model(데이터관리) / view(리액터) / controller(라우터안에있는애들.. 여기있는 코드들)
      .sort([[sortBy, order]]) // 무시
      .skip(skip) // .skip()으로 더보기눌럿을 때 이미 불려온 데이터는 거르고 불러옴
      // skip은 인자값이 계속 handleLoadmore 함수 실행될 때 마다 limit값이 추가돼서 저장될거니까 바뀜
      .limit(limit); // 불러올 데이터 갯수제한
    //요기부터 중요해요!!!@@@@@@
    const productsTotal = await Product.countDocuments(findArgs);
    // 얜 더보기 //  findArgs가 1인거의 갯수를 찾는데 -> 그중에서 findArgs가 continents가 1인거 찾는거임
    // documents- 몽고디비에서 데이터의 갯수 자체가 documents - 데이터 갯수 세어주는게 countDocuments이거임
    const hasMore = skip + limit < productsTotal ? true : false;
    // hasMore 는 T/F값 두가지중 하나만 가짐
    return res.status(200).send({ products, hasMore });
    // const products = await Product.find(findArgs) 여기서 products로 들어감
    // return res.status(200).send({ products, hasMore });
  } catch (error) {
    console.log(error);
  }
});

module.exports = productRouter;
