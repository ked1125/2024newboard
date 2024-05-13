// 기본 틀!!!
// const express = require("express");
// const { default: mongoose } = require("mongoose");
// const dotenv = require("dotenv");
// const app = express();
// const cors = require("cors");

// app.use(cors());

// dotenv.config();

// const server = async function () {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("db connected");

//     mongoose.set("debug", true);
//     app.use(express.json());

//     app.listen(4000);
//   } catch (error) {
//     console.log("no db");
//   }
// };

// server();
const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
// express, mongoose, dotenv require
const app = express();
// 상수 app선언 - express() 함수
const cors = require("cors");
const productRouter = require("./routes/productRoute");
// 필요한 파일들 require

app.use(cors());
// app은 express() 대입된상태이므로
// express().use() 에서 인자로 cors()사용..
// app.use()는 Express에서 미들웨어를 추가하는 함수

dotenv.config();
// .env 파일 사용하기위함

const server = async function () {
  // 비동기화 함수 server 생성및 선언 (async 사용했으니까 try~catch 받아줘야함)
  // async는 참만을 뱉어내므로 거짓일때를 받아낼 try~catch구문과 함께 쓰인다
  try {
    // try 구문은 참일 때 실행되는 부분
    await mongoose.connect(process.env.MONGO_URL);
    // mongoose에 연결하는부분이니까 await사용
    console.log("db connected");

    mongoose.set("debug", true);
    app.use(express.json());
    // 미들웨어! 요청(req)의 본문(body)에 포함된 JSON 형식의 데이터를 해석(parse)하여 JavaScript 객체로 변환해주는 역할
    // app.use(express.json());은 express.json() 미들웨어 함수를 Express 애플리케이션에 추가하여 모든 요청에 대해 요청 본문을 JSON 형식으로 파싱하는 기능을 활성화

    app.use("/products", productRouter);

    app.listen(4000);
  } catch (error) {
    // catch는 거짓일 때, 오류일때 실행 될 부분.
    console.log("no db");
  }
};

server();
// server함수 생성해줫으면 호출해줘야 써먹음!!!
