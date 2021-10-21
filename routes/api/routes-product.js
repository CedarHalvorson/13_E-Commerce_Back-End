const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
 
  try {
    const productInfo = await Product.findAll({
      include: [
        {
          model: Category,
        }, 
        {
          model: Tag,
          through: ProductTag,
        }
      ],
    });
    res.status(202).json(productInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
 
  try {
    // const productInfo = await Product.findByPk(req.params.id,
      const productInfo = Product.findOne({where:{id: req.body.id}, 
      include: [
        {
          model: Category,
        }, 
        {
          model: Tag,
          through: ProductTag,
        }
      ]
    });

    // if (!productInfo) {
      if(productInfo === undefined || productInfo === null){
      res.status(404).json({ message: "this doesn't exist" });
      return;
    }
    res.status(202).json(productInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  
  Product.create(req.body)
    .then((product) => {
   
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
    
      res.status(202).json(product);
    })
    .then((productTagIds) => res.status(202).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


router.put('/:id', async (req, res) => {
  
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      console.log(product)
     
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
    
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
   
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

     
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
    
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const dataCategory = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!dataCategory) {
      res.status(404).json({ message: 'No existence here!' });
      return;
    }
    res.status(200).json(dataCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
