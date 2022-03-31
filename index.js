const express = require('express')
const app = express()
const port = 3000

const {sequelize} = require('./sequelize');

var item = require('./item');
var ieinout = require('./income_exepense');

module.exports = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/stockinout', item.stockinout);
app.post('/ieinout', ieinout.create);

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})