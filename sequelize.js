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
console.log(Stock === sequelize.models.Stock); // true

//stock balances models

const StockBalances = sequelize.define('StockBalances', {
  	item_id:{
        type: Sequelize.INTEGER,
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

console.log(StockBalances === sequelize.models.StockBalances);

module.exports = {
	sequelize,
	Stock,
	StockBalances

};