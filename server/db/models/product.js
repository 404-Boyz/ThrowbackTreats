const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: "http://via.placeholder.com/350x350"
  }
})

module.exports = Product;

