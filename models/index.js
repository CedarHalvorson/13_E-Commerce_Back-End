
const Merchandise = require('./Product');
const Section = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Merchandise.belongsTo(Section, {
  foreignKey: 'category_id',
});

Section.hasMany(Merchandise, {
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
  Section,
  Tag,
  ProductTag,
};
