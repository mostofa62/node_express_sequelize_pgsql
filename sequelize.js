const { Sequelize , DataTypes } = require('sequelize')
const sequelize = new Sequelize('tinyerp', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  port:5432,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
// All Models
//Items
const Item = sequelize.define('Item', {
  
      id:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true

        },
        name:{ 
          type:'VARCHAR(100)',          
          allowNull: false

        },
        description:{
          type:'TEXT',
          allowNull: true

        },
        unit:{
          type:'SMALLINT',
          allowNull:true
        },
        sku:{ 
          type:'VARCHAR(65)',          
          allowNull: true

        },
        is_activated:{
          type:DataTypes.BOOLEAN,
          allowNull:false,
          defaultValue: false

        },
        user_id:{
          type:DataTypes.INTEGER,        
          allowNull:true
        },
        created_at: {
          type: DataTypes.DATE, 
          //defaultValue: Sequelize.literal("now()"),
          allowNull: true
        },
        updated_at: {
          type: DataTypes.DATE,
          //defaultValue: Sequelize.literal("now()"),
          allowNull: true
        },

}, {
  tableName: 'items',
  timestamps: false

});
//stock models
const Stock = sequelize.define('Stock', {
  
	    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      item_id:{
        type: DataTypes.INTEGER,
        allowNull: true
      },
      location_id:{
        type: DataTypes.INTEGER,
        allowNull: true
      },
      quantity:{
        type:DataTypes.BIGINT,
        defaultValue:0,
        allowNull:false
      },
      op_type:{
        type:'SMALLINT',        
        allowNull:true
      },
      user_id:{
        type:DataTypes.INTEGER,        
        allowNull:true
      },
      created_at: {
          type: DataTypes.DATE, 
          //defaultValue: Sequelize.literal("now()"),
          allowNull: true
      },
      updated_at: {
          type: DataTypes.DATE,
          //defaultValue: Sequelize.literal("now()"),
          allowNull: true
      },

}, {
  tableName: 'stocks',
  timestamps: false

});
//console.log(Stock === sequelize.models.Stock); // true

//stock balances models

const StockBalances = sequelize.define('StockBalances', {
  	item_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: true
    },
    location_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true
    },
    balance_quantity:{
        type:Sequelize.BIGINT,
        defaultValue:0,
        allowNull:false
    },
    op_type:{
        type:'SMALLINT',        
        allowNull:true
    },      
    created_at: {
        type: Sequelize.DATE, 
        //defaultValue: Sequelize.literal("now()"),
        allowNull: true
    },
    updated_at: {
        type: Sequelize.DATE,
        //defaultValue: Sequelize.literal("now()"),
        allowNull: true
    },
	  

}, {
  tableName: 'stock_balances',
  timestamps: false

});

//Accounts
const Accounts = sequelize.define('Accounts', {
        id:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true

        },
        name:{ 
          type:'VARCHAR(100)',          
          allowNull: false

        },
        description:{
          type:'TEXT',
          allowNull: true

        },
        order_by:{
          type:'SMALLINT',
          allowNull:false,
          unique: true
        },
        is_activated:{
          type:DataTypes.BOOLEAN,
          allowNull:false,
          defaultValue: false

        },
        user_id:{
          type:DataTypes.INTEGER,        
          allowNull:true
        },
        created_at: {
          type: DataTypes.DATE, 
          //defaultValue: Sequelize.literal("now()"),
          allowNull: true
        },
        updated_at: {
          type: DataTypes.DATE,
          //defaultValue: Sequelize.literal("now()"),
          allowNull: true
        },
    

}, {
  tableName: 'accounts',
  timestamps: false

});
//AccountBalances
const AccountBalances = sequelize.define('AccountBalances', {
      account_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true
      },      
      balance_amount:{
        type:DataTypes.BIGINT,
        defaultValue:0,
        allowNull:false
      },
      method:{
        type:'SMALLINT', // purchase/sales/income/expense       
        allowNull:true
      },
      op_type:{
        type:'SMALLINT',        
        allowNull:true
      },
      user_id:{
        type:DataTypes.INTEGER,        
        allowNull:true
      },
      created_at: {
          type: DataTypes.DATE, 
          //defaultValue: Sequelize.literal("now()"),
          allowNull: true
      },
      updated_at: {
          type: DataTypes.DATE,
          //defaultValue: Sequelize.literal("now()"),
          allowNull: true
      },
    

}, {
  tableName: 'account_balances',
  timestamps: false

});

//AccountTransactions
const AccountTransactions = sequelize.define('AccountTransactions', {
      id:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true

      },      
      account_id:{
        type: DataTypes.INTEGER,        
        allowNull: true
      },      
      amount:{
        type:DataTypes.BIGINT,
        defaultValue:0,
        allowNull:false
      },
      method:{
        type:'SMALLINT', // purchase/sales/income/expense       
        allowNull:true
      },
      op_type:{
        type:'SMALLINT',        
        allowNull:true
      },
      user_id:{
        type:DataTypes.INTEGER,        
        allowNull:true
      },
      created_at: {
          type: DataTypes.DATE, 
          //defaultValue: Sequelize.literal("now()"),
          allowNull: true
      },
      updated_at: {
          type: DataTypes.DATE,
          //defaultValue: Sequelize.literal("now()"),
          allowNull: true
      },
    

}, {
  tableName: 'account_transactions',
  timestamps: false

});


//Income /  Expense
const IncomeExpense = sequelize.define('IncomeExpense', {
        id:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true

        },
        t_id:{
          type: DataTypes.INTEGER, // accounts transaction ID
          allowNull: true
        },
        category_id:{
          type: DataTypes.INTEGER,
          allowNull: true
        },
        amount:{
          type:DataTypes.BIGINT,
          defaultValue:0,
          allowNull:false
        },
        op_type:{
          type:'SMALLINT',  //1 means income, 2 means expense      
          allowNull:true
        },
        user_id:{
          type:DataTypes.INTEGER,        
          allowNull:true
        },
        created_at: {
          type: DataTypes.DATE, 
          //defaultValue: Sequelize.literal("now()"),
          allowNull: true
        },
        updated_at: {
          type: DataTypes.DATE,
          //defaultValue: Sequelize.literal("now()"),
          allowNull: true
        },
    

}, {
  tableName: 'income_expense',
  timestamps: false

});

//console.log(StockBalances === sequelize.models.StockBalances);

module.exports = {
	sequelize,
	Stock,
	StockBalances,
  AccountBalances,
  AccountTransactions,
  IncomeExpense

};