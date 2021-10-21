
const Merchandise = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Merchandise.belongsTo(Category, {
  foreignKey: 'category_id',
});

Category.hasMany(Merchandise, {
  foreignKey: 'category_id',
});

Merchandise.belongsToMany(Tag, {
  through: ProductTag,
  
});

Tag.belongsToMany(Merchandise, {
  through: ProductTag,
 
});

module.exports = {
  Merchandise,
  Category,
  Tag,
  ProductTag,
};
