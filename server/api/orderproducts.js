const router = require('express').Router()
const db = require('../db')
const { Order_products, Order } = require('../db/models')

router.get('/', (req, res, next) => {
  Order_products.findAll({ include: { all: true } })
    .then(orderprods => res.json(orderprods))
    .catch(console.error("Sorry, your order products are not available"))
})

router.post('/', (req, res, next) => {
  Order.create()
    .then((order) => {
      req.body.forEach((el) =>
        el.orderId = order.id);
      console.log('HERE I AM', req.body);
      return Order_products.bulkCreate(req.body).then(() => Order_products.update({ orderId: order.id }, {
        where: {
          cartId: req.cookies.cartId
        }
      }))
    })
    .then((orderprods) => res.json(orderprods))
    .catch(err => console.error(err))
})

// router.get('/:orderId', (req, res, next) => {
//   Order.findById(req.params.id)
//     .then(order => res.json(order))
//     .catch(next)
// })

module.exports = router
