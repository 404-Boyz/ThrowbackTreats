const router = require('express').Router()
const db = require('../db')
const { Product } = require('../db/models')


router.use('/:productId/reviews', require('./reviews'))

// router.use('/categories', require('./categories') )

router.get('/', (req, res, next) => {
  Product.findAll({
    include: [
      { all: true }
    ]
  })
    .then(products => res.json(products))
    .catch(console.error("Sorry, product list not available"))
})

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(201).send(product))
    .catch(next)
})

router.put('/:productId', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.update(req.body))
    .then(product => res.json(product))
    .catch(next)
})

router.delete('/:productId', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(res.sendStatus(204))
    .catch(next)
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})


module.exports = router
