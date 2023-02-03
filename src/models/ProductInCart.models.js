const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const productInCart = db.define(
  'products_in_cart',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('not_purchased', 'purchased'),
      defaultValue: 'not_purchased',
    },
  },
  {
    timestamps: false,
  }
);

module.exports = productInCart;
