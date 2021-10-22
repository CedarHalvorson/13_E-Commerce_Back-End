const router = require('express').Router();
const { Merchandise, Section, Tag, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
 
  try {
    const productInfo = await Merchandise.findAll({
      include: [
        {
          model: Section,
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
      const productInfo = Merchandise.findOne({where:{id: req.body.id}, 
      include: [
        {
          model: Section,
        }, 
        {
          model: Tag,
          through: ProductTag,
        }
      ]
    });

    
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
  
  Merchandise.create(req.body)
    .then((Merchandise) => {
   
      if (req.body.tagIds.length) {
        const arrayOfProductTags = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(arrayOfProductTags);
      }
    
      res.status(202).json(Merchandise);
    })
    .then((productTagIds) => res.status(202).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


router.put('/:id', async (req, res) => {
  
  Merchandise.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((Merchandise) => {
      console.log(Merchandise)
     
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
    
      const tagIdsProduct = productTags.map(({ tag_id }) => tag_id);
      
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !tagIdsProduct.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
   
      const removeTagsToProduct = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

     
      return Promise.all([
        ProductTag.destroy({ where: { id: removeTagsToProduct } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
    
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  try {
    const dataCategory = await Merchandise.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if(dataCategory === undefined || dataCategory === null){
      res.status(404).json({ message: 'No existence here!' });
      return;
    }
    res.status(200).json(dataCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
