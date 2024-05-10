const { default: mongoose } = require("mongoose");

// mongoose.Schema({})
// const ProductSchema = mongoose.Schema({});
const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    maxLength: 30,
  },
  description: String,
  price: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
    default: [],
  },
  sold: {
    type: Number,
    default: 0,
  },
  continents: {
    type: Number,
    default: 1,
  },
  views: {
    type: Number,
    default: 0,
  },
});

ProductSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      // 우선순위?
      title: 5,
      description: 1,
    },
  }
);

// mongoose.model("모델명",Schema명??);
// const Product = mongoose.model("product", ProductSchema);
const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
