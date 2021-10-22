const router = require('express').Router();
const { Section, Merchandise} = require('../../models');



router.get('/', async (req, res) => {
  try {
    const dataCategory = await Section.findAll({
      include: [
        {
          model: Merchandise,
        }
      ]
    });
    console.log("datatcatagory", dataCategory)
    res.status(200).json(dataCategory);
  } catch (err) {
    console.log('error in categories: ', err)
    res.status(500).json(err);
  }
  
});


router.get('/:id', async (req, res) => {
  
  try {
    const dataCategory = await Section.findByPk(req.params.id, {
      include: [
        {
          model: Merchandise,
        }
      ]
    });
    if ( dataCategory === undefined || dataCategory === null){
    
      res.status(400).json({ message: 'this does not exist' });
      return;
    }
    res.status(202).json(dataCategory);
  } catch (err) {
    console.log('error in categories: ', err)
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  
  try {
    console.log(req.body);
    const dataCategory = await Section.create(req.body);

    res.status(202).json(dataCategory);
  } catch (err) {
    res.status(404).json(err);
  }
});
  

router.put('/:id', async (req, res) => {
  
  try {
    const dataCategory = await Section.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        }
      },
    );

    if ( dataCategory === undefined || dataCategory === null){
    
      res.status(404).json({ message: 'this does not exist' });
      return;
    }
    res.status(200).json(dataCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {

  try {
    const dataCategory = await Section.destroy({
      where: {
        id: req.params.id

      }
    });
    if ( dataCategory === undefined || dataCategory === null){
    
      res.status(404).json({ message: 'this does not exist' });
      return;
    }
    res.status(200).json(dataCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
