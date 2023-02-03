const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return products_in_carts.init(sequelize, DataTypes);
}

class products_in_carts extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carts',
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
      allowNull: false,
      defaultValue: 1
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("not_purchased","purchased"),
      allowNull: true,
      defaultValue: "not_purchased"
    }
  }, {
    sequelize,
    tableName: 'products_in_carts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_in_carts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
