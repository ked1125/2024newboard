const express = require("express");
const Product = require("../models/Product");
const productRouter = express.Router();
const Image = require("../models/Image");
const upload = require("../middleware/imageUpload");

productRouter.get("/", async (req, res) => {
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    // 한줄에 불러올 데이터의 개수
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    //  더보기 버튼 누른 후엔 초기값 0+limit값 4 가 합쳐져서 4로 들어옴
    // const sortBy = req.query.sortBy ? req.query.sortBy : "_id"; // 일단무시
    // const order = req.query.order ? req.query.order : "desc"; // 일단무시
    // const search = req.query.searchForm; // 일단무시

    // let findArgs = {} // 일단무시

    // for (const key in req.query.filters) {} // 일단 무시

    try {
        const products = await Product.find({}).skip(skip).limit(limit)
        const productsTotal = await Product.countDocuments({})
        const hasMore = skip + limit < productsTotal ? true : false
        //  모든 글들이 다 불려온 이후로는 더보기 버튼이 사라지게 하기 위함.
        return res.status(200).json({products, hasMore})
        //   front에는 res.data의 형태로 다시 돌아감!!! back->front :: res로 응답하고, front->back :: req로 요청함
    } catch (error) {
        console.log(error)
    }

})


module.exports = productRouter;
