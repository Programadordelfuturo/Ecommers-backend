const express = require("express");

const {
  addProductCart,
  updateCart,
  deleteProductCart,
  purchaseCart,
} = require("../controllers/carts.controller");


const {createProductInCartValidator}=require('../middlewares/validators.middlewares')
const {protectSession}=require('../middlewares/auth.middlewares')


const cartsRoutes = express.Router();


cartsRoutes.use(protectSession)

cartsRoutes.post("/add-product",createProductInCartValidator, addProductCart);
cartsRoutes.patch("/update-cart", updateCart);
cartsRoutes.delete("/:productId", deleteProductCart);
cartsRoutes.post("/purchase", purchaseCart);


module.exports = { cartsRoutes };
