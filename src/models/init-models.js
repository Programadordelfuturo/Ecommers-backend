const DataTypes = require("sequelize").DataTypes;
const _carts = require("./carts");
const _orders = require("./orders");
const _products = require("./products");
const _products_in_carts = require("./products_in_carts");
const _products_in_orders = require("./products_in_orders");
const _users = require("./users");

function initModels(sequelize) {
  const carts = _carts(sequelize, DataTypes);
  const orders = _orders(sequelize, DataTypes);
  const products = _products(sequelize, DataTypes);
  const products_in_carts = _products_in_carts(sequelize, DataTypes);
  const products_in_orders = _products_in_orders(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  products_in_carts.belongsTo(carts, { as: "cart", foreignKey: "cart_id" });
  carts.hasMany(products_in_carts, { as: "products_in_carts", foreignKey: "cart_id" });

  products_in_orders.belongsTo(orders, { as: "order", foreignKey: "order_id" });
  orders.hasMany(products_in_orders, { as: "products_in_orders", foreignKey: "order_id" });

  products_in_carts.belongsTo(products, { as: "product", foreignKey: "product_id" });
  products.hasMany(products_in_carts, { as: "products_in_carts", foreignKey: "product_id" });

  products_in_orders.belongsTo(products, { as: "product", foreignKey: "product_id" });
  products.hasMany(products_in_orders, { as: "products_in_orders", foreignKey: "product_id" });

  carts.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(carts, { as: "carts", foreignKey: "user_id" });

  orders.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(orders, { as: "orders", foreignKey: "user_id" });

  products.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(products, { as: "products", foreignKey: "user_id" });

  return {
    carts,
    orders,
    products,
    products_in_carts,
    products_in_orders,
    users,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
