const Sequelize = require('sequelize')
const db = require('../db')

const Order_products= db.define('order_products', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
      type: Sequelize.DECIMAL(10,2)
  }
})

module.exports = Order_products;