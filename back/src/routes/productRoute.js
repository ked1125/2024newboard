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
  try {
    // const products = await Product.find({});
    const products = await Product.find({}).sort({ _id: -1 }); // 키:밸류형태 -1 : 최근 입력값이 제일 위에 나오는게 -1, 반대가 1
    return res.status(200).send({ products });
  } catch (error) {
    console.log(error);
  }
});

module.exports = productRouter;
