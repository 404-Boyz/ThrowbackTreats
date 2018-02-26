const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    len: {
      args: [5, 5000],
      msg: "Please provide a review between 5 and 5000 characters!"
    }
  }
})

module.exports = Review;

