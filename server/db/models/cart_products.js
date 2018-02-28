const Sequelize = require('sequelize')
const db = require('../db')

const Cart_products= db.define('cart_products', {
  quantity: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM('open', 'ordered', 'removed'),
    defaultValue: 'open',
    allowNull: false
  }
})

module.exports = Cart_products;

