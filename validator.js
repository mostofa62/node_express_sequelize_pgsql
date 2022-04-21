const { body, validationResult } = require('express-validator')
const { Item } = require('./sequelize');
//Item Save Rules
const itemSchema =  {
  name: {
    notEmpty: true,
    isLength:{
      options: { min: 3 },
      errorMessage: 'Name length at least 3 character'
    },
    errorMessage: "Name field cannot be empty"
  },
  sku:{
    custom: {
      options: (value, { req, location, path }) => {
          return Item.findOne({
              where: { sku: value },
              paranoid: false
          }).then(data => {
              //console.log(data.id);
              //console.log(req.body.id);
              //console.log(data.id == req.body.id);
              if ( (data !== null && typeof req.body.id === "undefined") 
              || ( data!== null && req.body.id != data.id )) {                                  
                
                return Promise.reject('Sku('+value+') must be unique for each product!!!')
              }
          })
      }
    }
  }

};

const validate = validations => {
  return async (req, res, next) => {
      await Promise.all(validations.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
          return next();
      }

      res.status(422).json({
          errors: errors.array()
      });
  };
};


module.exports = {
  itemSchema,
  validate,
};