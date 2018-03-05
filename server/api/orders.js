const router = require('express').Router()
const db = require('../db')
const { Order_products, Order } = require('../db/models')

router.get('/', (req, res, next) => {
  Order.findAll({ include: { all: true } })
    .then(orders => res.json(orders))
    .catch(console.error("Sorry, your orders are not available"))
});

router.get('/users')

module.exports = router;
