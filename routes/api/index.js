
const router = require("express").Router()

const routesCategory = require('./routes-category');
const routesProduct = require('./routes-product');
const routesTag = require('./routes-tag');



router.use('/categories', routesCategory);
router.use('/products', routesProduct);
router.use('/tags', routesTag);

module.exports = router;
