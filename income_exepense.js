'use strict'

exports.create = async function(req, res){

	//import library
    const {sequelize, AccountBalances ,AccountTransactions, IncomeExpense} = require('./sequelize');
    const { QueryTypes } = require('sequelize');
    var moment = require('moment');

	//REUQEST DATA
    const category = parseInt(req.body.category); // income / expense category
    const optype = parseInt(req.body.optype); // 1 for income, 2 for expense
    const amount = parseInt(req.body.amount);
    var account = req.body.account;

    //GLOBAL RETURN MESSAGE
    var return_data = {
		'msg':'nothing_happend',
		'result':3
	};

    //CORE OPERATION STARTED
    var account_top = await sequelize.query('SELECT id FROM accounts ORDER BY order_by ASC limit 1',
    {
    	type: QueryTypes.SELECT	
    });

    if( typeof account === "undefined" && typeof account_top[0] !== "undefined"){
    	account = account_top[0].id;
    }

    //console.log(account);

    const account_balance = await sequelize.query(
	  'SELECT balance_amount FROM account_balances WHERE account_id = :account_id',
	  {
	    replacements: { 
	    	account_id: account 
	    },
	    type: QueryTypes.SELECT
	  }
	);

	console.log(account_balance);


	var balance = typeof account_balance[0] === "undefined" ? 0 : parseInt(account_balance[0].balance_amount);



	balance = optype == 1 ? balance+amount : balance - amount;

	console.log(balance);

	var method = optype == 1 ? 10: 11; // 10 income, 11 expense, 12 purchase, 13 sales
	console.log(method);
	//transaction for insert and balance
    const t = await sequelize.transaction();

    try{
    	//create income or expense
    	const ie = await IncomeExpense.create({
    		category_id:category,
    		op_type : optype,
    		amount: amount,    		
			created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
	    	updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
	  	}, { transaction: t });
    	// add to account transactions
    	const act = await AccountTransactions.create({
    		account_id: account,
    		amount: amount,
    		method: method,
    		op_type: optype,
    		created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
	    	updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    	}, { transaction: t });
    	//create or update account balances
    	if( typeof account_balance[0] === "undefined" ){
    		
    		await AccountBalances.create({
    			account_id: account,
    			balance_amount: balance,
    			method: method,
    			op_type: optype,
    			created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
	    		updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    		}, { transaction: t });

    	}else{

    		await AccountBalances.update({ 
					balance_amount: balance,
					op_type:optype,
					method:method,
					updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
				}, {

				transaction:t,
				where: {
				    account_id: account
				}
			});

    	}

    	//add reference of trasnsaction id to income or expense
    	await IncomeExpense.update({ t_id: act.id }, {
    	  transaction:t,	
		  where: {
		    id: ie.id
		  }
		});

    	await t.commit();

    	var msg = optype == 1 ? 'income_added_succefully':'expense_added_succefully' ;
        return_data['msg'] = amount+' '+msg;
        return_data['result'] = 1;
        return_data['balance'] = balance;
    }catch (error) {
    	console.log(error);
    	await t.rollback();
    	return_data['msg'] = 'transaction_rollback';
        return_data['result'] = 0;
        return_data['error'] = error;

    }

    res.send(return_data);



};