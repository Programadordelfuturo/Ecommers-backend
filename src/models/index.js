const initModels = require("./init-models");
const db = require("../utils/database");

const {  OrderModels, productmodels, productinCart, productinOrder, usersmodels } = models;

module.exports = {
    
  OrderModels,
  productmodels,
  productinCart,
  productinOrder,
  usersmodels
};


const initModels = require("./init-models");
const db = require("../utils/database");

const models = initModels(db);

const { orders, products, carts, users } = models;

module.exports = {
  orders,
  products,
  carts,
  users
};