const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

const Merchandise = require('./Product');
const Tag = require('./Tag');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: Merchandise,
        key: 'id',
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: Tag,
        key: 'id',
      }
    },
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
