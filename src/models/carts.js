const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return carts.init(sequelize, DataTypes);
}

class carts extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'carts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "carts_pkey",
        unique: true,
        fields: [
          { name: "id" }
        ]
      },
    ]
  });
  }
}
