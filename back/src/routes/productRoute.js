const express = require("express");
const Product = require("../models/Product");
const productRouter = express.Router();

// productRouter.post();
// productRouter.get()
// productRouter.post("/", async (req, res) => {});
productRouter.post("/", async (req, res) => {
  try {
    const product = await new Product(req.body).save();
    //  req.body가 입력한값인듯함.
    return res.status(200).send({ product });
  } catch (error) {
    console.log(error);
  }
});

// productRouter.get("/", async(req,res)=>{});
productRouter.get("/", async (req, res) => {
  // 삼항연산자들임!!!
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const order = req.query.order ? req.query.order : "desc";
  const search = req.query.searchForm;

  let findArgs = {};

  for (let key in req.query.filters) {
    // for -in 문
    if (req.query.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.query.filters[key][0],
          // great then equal? 크거나 같을 때 (이상일때)
          $lte: req.query.filters[key][1],
          // less then equal? 작거나 같을 때 (이하일때)
        };
      } else {
        findArgs[key] = req.query.filters[key];
      }
    }
  }

  // console.log(findArgs);
  console.log(search);

  if (search) {
    findArgs["$text"] = { $search: search };
    // findArgs["$text"] = {$search:search}; &search는 몽구스에서 쓰는 search
  }

  console.log(findArgs);

  try {
    // const products = await Product.find({});
    // const products = await Product.find({}).sort({ _id: -1 }); // 키:밸류형태 -1 : 최근 입력값이 제일 위에 나오는게 -1, 반대가 1
    const products = await Product.find(findArgs)
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);
    //요기부터 중요해요!!!@@@@@@
    const productsTotal = await Product.countDocuments(findArgs);
    const hasMore = skip + limit < productsTotal ? true : false;
    return res.status(200).send({ products, hasMore });
    // return res.status(200).send({ products, hasMore });
  } catch (error) {
    console.log(error);
  }
});

module.exports = productRouter;
