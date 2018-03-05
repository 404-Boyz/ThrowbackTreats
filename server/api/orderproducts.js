const router = require('express').Router()
const db = require('../db')
const { Order_products, Order } = require('../db/models')

router.get('/', (req, res, next) => {
  Order_products.findAll({ include: { all: true } })
    .then(orderprods => res.json(orderprods))
    .catch(console.error("Sorry, your order products are not available"))
})

// router.get('/:orderId', (req, res, next) => {
//   Order.findById(req.params.id)
//     .then(order => res.json(order))
//     .catch(next)
// })

module.exports = router
