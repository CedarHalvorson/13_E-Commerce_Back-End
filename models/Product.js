const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

const Section = require('./Category');


class Merchandise extends Model {}


Merchandise.init(
  {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false,
      validate:{
        isDecimal: true,
      }},
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate:{
        isNumeric: true,
      }

    },
    category_id: {
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: Section,
        key: 'id',
      }
    }
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Merchandise;
