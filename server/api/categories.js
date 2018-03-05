const router = require('express').Router()
const db = require('../db')
const { Product } = require('../db/models')

router.get('/food', (req, res, next) => {
  Product.findAll({
    where: {
      categoryId: 1
    }
  })
    .then(product => res.json(product))
    .catch(next)
})

router.get('/drink', (req, res, next) => {
  Product.findAll({
    where: {
      categoryId: 2
    }
  })
    .then(product => res.json(product))
    .catch(next)
})

router.get('/novelties', (req, res, next) => {
  Product.findAll({
    where: {
      categoryId: 3
    }
  })
    .then(product => res.json(product))
    .catch(next)
})
