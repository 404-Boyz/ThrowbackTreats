const router = require('express').Router()
const db = require('../db')
const { Order_products, Order } = require('../db/models')

router.get('/', (req, res, next) => {
  // Order.findById(1)
  //   .then(order => Promise.resolve(order))
  //   .then(order => {
  //     console.log(order);
  //     order.getOrder_products('order', {
  //       where: {
  //         id: 1
  //       }
  //     })
  //   })
  //   .then(order => res.json(order))
  // .then(order => res.json(order))
  // .then(order => order.getOrder_products())
  // .then(order => res.json(order))
  Order_products.findAll({ include: { all: true } })
    .then(orders => res.json(orders))
    .catch(console.error("Sorry, your orders are not available"))
})

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => res.json(order))
    .catch(next)
})

module.exports = router
