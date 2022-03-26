'use strict'

const { QueryTypes } = require('sequelize');

exports.stockinout = function(req, res){
  
	const item = req.body.item;
    const optype = req.body.optype;
    const quantity = req.body.quantity;

    const [results, metadata] = await sequelize.query(
	  'SELECT balance_quantity FROM stock_balances WHERE item_id = :item_id',
	  {
	    replacements: { item_id: item },
	    type: QueryTypes.SELECT
	  }
	);

    res.send({
	    'item': item,
	    'optype': optype,
	    'quantity': quantity,
	    'results':results
	});

};