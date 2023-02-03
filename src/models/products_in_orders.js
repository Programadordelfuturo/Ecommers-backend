const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return products_in_orders.init(sequelize, DataTypes);
}

class products_in_orders extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("not_purchased","purchased"),
      allowNull: true,
      defaultValue: "purchased"
    }
  }, {
    sequelize,
    tableName: 'products_in_orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_in_orders_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
