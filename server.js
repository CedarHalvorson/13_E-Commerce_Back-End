const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./routes');
const morgan = require('morgan')
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use (morgan()) 
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force:false}).then(()=>{
  app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
});

