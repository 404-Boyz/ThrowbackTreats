const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: 0
  },
  status: {
    type: Sequelize.ENUM('created', 'processing', 'completed', 'cancelled'),
    defaultValue: 'created'
  }
})

module.exports = Order;

