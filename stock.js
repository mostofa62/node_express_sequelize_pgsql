'use strict'



exports.stockinout = async function(req, res){

	
  
	//import library
    const {sequelize, Stock ,StockBalances} = require('./sequelize');
    const { QueryTypes } = require('sequelize');
    var moment = require('moment');
    //REUQEST DATA
    const item = parseInt(req.body.item);
    const optype = parseInt(req.body.optype);
    const quantity = parseInt(req.body.quantity);
    var location = req.body.location;

    //GLOBAL RETURN MESSAGE
    var return_data = {
		'msg':'noinputstockmessage',
		'result':3
	};
    
    //CORE OPERATION STARTED

    var location_top = await sequelize.query('SELECT id FROM locations ORDER BY order_by ASC limit 1',
    {
    	type: QueryTypes.SELECT	
    });
    //console.log(location_top+" req "+location);
    if( typeof location === "undefined" && typeof location_top[0] !== "undefined"){
    	location = location_top[0].id;
    }
    //location = parseInt(location);

    //console.log('location:'+location_top);

    //return_data['location'] = location_top[0];

    const stock_balance = await sequelize.query(
	  'SELECT balance_quantity FROM stock_balances WHERE item_id = :item_id and location_id = :location_id',
	  {
	    replacements: { 
	    	item_id: item,
	    	location_id:location 
	    },
	    type: QueryTypes.SELECT
	  }
	);

	//console.log(stock_balance);

	var balance = typeof stock_balance[0] === "undefined" ? 0 : parseInt(stock_balance[0].balance_quantity);


	if((balance-quantity) < 0 && optype == 2){
                return_data['msg'] = 'itemnotavailable';
                return_data['result'] = 2;
    }else{

    	balance = optype == 1 ? balance+quantity : balance - quantity;

    	//transaction for insert and balance
    	const t = await sequelize.transaction();

    	try{


	    	await Stock.create({
	    			item_id: item,
	    			quantity: quantity,
	    			op_type: optype,
	    			location_id:location,
	    			created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
	    			updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
	  			}, { transaction: t });

	    	

  			if( typeof stock_balance[0] === "undefined" ){

  				await StockBalances.create({
	  					item_id:item,
	  					balance_quantity:balance,
	  					op_type: optype,
	  					location_id:location,
	  					created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
	    				updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
	  			},{transaction:t});


  			}else{
  				
	  			await StockBalances.update({ 
  					balance_quantity: balance,
  					op_type:optype,
  					updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
  				}, {

  				  transaction:t,
				  where: {
				    item_id: item,
				    location_id:location,
				  }
				});

  			}



    		await t.commit();
    		var msg = optype == 1 ? 'itemstcokedsuccefully':'itemdeductedsuccefully' ;
        	return_data['msg'] = quantity+' '+msg;
        	return_data['result'] = 1;
        	return_data['balance'] = balance;

    	} catch (error) {
    		//console.log(error);
    		await t.rollback();
    		return_data['msg'] = 'itemstcokedrollback';
            return_data['result'] = 0;
            return_data['error'] = error;
    	}
    	//end transaction for insert

    	
    }

	//console.log(JSON.stringify(stock_balance[0], null, 2));

    res.send(return_data);

};