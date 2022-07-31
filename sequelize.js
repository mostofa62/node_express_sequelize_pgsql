const { Sequelize , DataTypes } = require('sequelize')
require('dotenv').config()

const hostname = process.env.DB_P_HOST;
const database = process.env.DB_P;
const user = process.env.DB_P_USER;
const password = process.env.DB_P_PASSWORD;
const port = process.env.DB_P_PORT;

const sequelize = new Sequelize(database, user, password, {
  host: hostname,
  dialect: 'postgres',
  port:port,
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
  timestamps: true,
  createdAt: 'created_at',
  updatedAt:'updated_at',
  paranoid: true,
  deletedAt: 'deleted_at'
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
        type:DataTypes.FLOAT(10, 2),
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
        type:DataTypes.FLOAT(10, 2),
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
  Item,
	Stock,
	StockBalances,
  AccountBalances,
  AccountTransactions,
  IncomeExpense

};