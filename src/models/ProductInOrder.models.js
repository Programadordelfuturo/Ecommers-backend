const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const productInOrder = db.define(
  'products_in_order',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('not_purchased', 'purchased'),
      defaultValue: 'purchased',
    },
  },
  {
    timestamps: false,
  }
);

module.exports = productInOrder;
