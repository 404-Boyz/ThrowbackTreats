const router = require('express').Router()
const db = require('../db')
const { Order_products, Order } = require('../db/models')

router.get('/', (req, res, next) => {
  Order.findAll({ include: { all: true } })
    .then(orders => res.json(orders))
    .catch(console.error("Sorry, your orders are not available"))
});

router.put('/:id', (req, res, next) => {
  console.log('status route hit', 'req.body', req.body, 'id: ', req.params.id)

  Order.findById(req.params.id)
    .then(order => order.update({
      status: req.body.status
    }))
    .then(order => res.json(order))
})

module.exports = router;
