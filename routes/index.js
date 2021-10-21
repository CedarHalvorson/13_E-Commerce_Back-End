const router = require('express').Router();
const routesToApi = require('./api');

router.use('/api', routesToApi);

router.use((req, res) => {
  res.send("<p>Incorrect route</p>")
});

module.exports = router;