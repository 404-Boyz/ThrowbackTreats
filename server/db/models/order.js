const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  productsArray: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    validate: {
      allowNull: false
    }
  }
})

module.exports = Order;

