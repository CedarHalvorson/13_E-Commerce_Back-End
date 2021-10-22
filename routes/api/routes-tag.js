const router = require('express').Router();
const { Tag, Merchandise, ProductTag } = require('../../models');




router.get('/:id', async (req, res) => {
  
  try {
    const tagInfo = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Merchandise,
          through: ProductTag,
        }],});

        if (tagInfo === undefined || tagInfo === null){
    
      res.status(404).json({ message: 'No existo!' });
      return;}
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }});



  router.get('/', async (req, res) => {

    try {
      const tagInfo = await Tag.findAll({
        include: [
          {
            model: Merchandise,
            through: ProductTag,
          }
        ],
  });
  res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
  
  });

  router.delete('/:id', async (req, res) => {
    try {
      const tagInfo = await Tag.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (tagInfo === undefined || tagInfo === null){
      
        res.status(404).json({ message: "You're not allowed to go there!" });
        return;
      }
      res.status(200).json(tagInfo);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


router.post('/', async (req, res) => {
  
  try {
    const tagInfo = await Tag.create(req.body);
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagInfo = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
      where: {
        id: req.params.id,
      }
    });

    if (tagInfo === undefined || tagInfo === null){
    
      res.status(404).json({ message: 'You have come to the land of nah!' });
      return;
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;