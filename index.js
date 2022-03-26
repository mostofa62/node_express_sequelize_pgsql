const express = require('express')
const app = express()
const port = 3000



var item = require('./item');

module.exports = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/stockinout', item.stockinout);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})