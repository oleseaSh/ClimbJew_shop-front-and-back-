import {Sequelize} from 'sequelize'

export default new Sequelize(
    process.env.DB_NAME, // база данных
    process.env.DB_USER, // пользователь
    process.env.DB_PASS, // пароль
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)


// const Product = Sequelize.define([
//     'require',
//     'dependency'
// ], function(require, factory) {
//     'use strict';
    
// });

// class Product extends Model {}
// class ProductProp extends Model {}

// // связь товара с его свойствами: у товара может быть несколько свойств, но
// // каждое свойство связано только с одним товаром
// Product.hasMany(ProductProp, {as: 'props'})
// ProductProp.belongsTo(Product)




