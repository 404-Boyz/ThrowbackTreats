const Sequelize = require('sequelize')
const db = require('../db')

const Cart_products= db.define('cart_products', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Cart_products;

