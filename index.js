const express = require('express')
const cors = require('cors');
require('dotenv').config()


const app = express()
const port = process.env.PORT;

app.use(cors({
  origin: '*'
}));

//connections and models here
const {sequelize} = require('./sequelize');

//validators here
const { itemSchema, validate } = require('./validator.js')
const { checkSchema } = require('express-validator');


//controllers
var item = require('./modules/itemcategory/item')
var stock = require('./stock');
var ieinout = require('./income_exepense');

module.exports = app;

//app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//app.post('/item-create',item.create);


app.post('/stockinout', stock.stockinout);
app.post('/ieinout', ieinout.create);
app.post('/ieinout-update', ieinout.update);
//Item CRUD
app.get('/items',item.index);
app.post('/item-create',
validate(checkSchema(itemSchema)),
item.create);
app.post('/item-update',
validate(checkSchema(itemSchema)),
item.update);
app.post('/item-delete',item.delete);
app.post('/item-show',item.show);

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