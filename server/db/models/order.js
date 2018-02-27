const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: Sequelize.ENUM('created', 'processing', 'completed', 'cancelled'),
    defaultValue: 'created',
    allowNull: false
  }
})

module.exports = Order;

