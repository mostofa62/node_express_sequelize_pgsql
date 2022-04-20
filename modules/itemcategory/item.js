'use strict'


exports.create = async function(req, res){

	//import library
    const { sequelize, Item } = require('../../sequelize');
    const { QueryTypes } = require('sequelize');
    const {GenerateSku} = require('../../util');
    var moment = require('moment');

    //REUQEST DATA    
    var name = req.body.name;
    var sku  =  req.body.sku.length > 1  ? req.body.sku: GenerateSku(name) ;
    var is_activated = req.body.is_activated > 0 ? true: false;
    var description = req.body.description;

    const item = await Item.create({ 
        name: name,
        sku : sku,
        unit: req.body.unit,
        description:description,
        is_activated : is_activated,
        //created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
		//updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    });


    res.status(200).json({
        success: item.id > 0 ? true:false,
        message: item.id > 0 ? 'Item Saved successfully':'Item Did not saved',
    })

};

exports.update = async function(req, res){

	//import library
    const { sequelize, Item } = require('../../sequelize');
    const { QueryTypes } = require('sequelize');
    const {GenerateSku} = require('../../util');
    var moment = require('moment');

    //REUQEST DATA
    var id = parseInt(req.body.id);    
    var name = req.body.name;
    var sku  =  req.body.sku;
    var description = req.body.description;
    var is_activated = req.body.is_activated > 0 ? true: false;    

    var item = await Item.update({ 
        name: name,
        sku : sku,
        unit: req.body.unit,
        description: description,
        is_activated : is_activated,        
		//updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    },{
        where:{
            id : id
        }
    });

    //console.log(item);
    res.status(200).json({
        success: item > 0 ? true:false,
        message: item > 0 ? 'Item('+name+') updated successfully':'Item('+name+') Did not updated',
    })

};


exports.delete = async function(req, res){
    const { sequelize, Item } = require('../../sequelize');
    var id = parseInt(req.body.id);

    const item = await Item.findByPk(id, { paranoid: false });
    const deleted_item =  await Item.destroy({
        where: {
          id: id
        }
    });
    
    //console.log(deleted_item);
    
    
    res.status(200).json({
        success: deleted_item > 0 ? true:false,
        message: deleted_item > 0 ? 'Item('+item.name+') deleted successfully':'Item('+item.name+') Did not deleted',
    })
      

};

exports.show = async function(req, res){
    const { sequelize, Item } = require('../../sequelize');
    var id = parseInt(req.body.id);

    const item = await Item.findByPk(id);
    res.send(item);

};


exports.index = async function(req, res){
    

    //import library
    const { sequelize, Item } = require('../../sequelize');
    const { Sequelize, QueryTypes } = require('sequelize');

    const Op = Sequelize.Op;


    //REUQEST DATA
    var page = parseInt(req.query.page);
    const per_page = parseInt(req.query.per_page);
    //core request data
    const name = req.query.name;
    const sku = req.query.sku;

    var condition = {
    };


    if(!!name && !!sku){
        condition = {
            [Op.or]: [
                {
                    name: {
                        [Op.iLike]: '%'+name+'%'
                    }
                },
                {
                    sku:{
                        [Op.eq]: sku
                    }
                }                
            ],
        };
        //page = 0;
    }else if(!!name){
        condition = {            
                name: {
                    [Op.iLike]: '%'+name+'%'
                }        
        };
        //page = 0;
    }else if(!!sku){
        condition = {            
                sku: {
                    [Op.eq]: sku
                }        
        };
        //page = 0;
    }
 

    var offset = page * per_page;
    

    //console.log(req);
    //res.send(req.query);    

    /*
    const results  = await sequelize.query('SELECT * FROM items',
    {
    	type: QueryTypes.SELECT	
    });


    var return_data = {
        'result':results
    };
    */
   
    const { count, rows } = await Item.findAndCountAll({        
        where: condition,
        offset: offset,
        limit: per_page
    });
    var return_data = {
        'page': page,
        'per_page':per_page,
        'total': count,
        'data':rows
    };


    res.send(return_data);

};