const router = require('express').Router()
const db = require('../db')
const { Review } = require('../db/models')


router.get('/', (req, res, next) => {
   Review.findAll()
   .then(reviews => res.json(reviews))
   .catch(console.error("Sorry, reviews not available"))
})

router.post('/', (req, res, next) => {
  Review.create(req.body)
  .then(review => res.status(201).send(review))
  .catch(next)
})

router.put('/:reviewId', (req, res, next) => {
  Review.findById(req.params.id)
  .then(review => review.update(req.body))
  .then(review => res.json(review))
  .catch(next)
})

router.delete('/:reviewId', (req, res, next) => {
  Review.findById(req.params.id)
  .then(review => review.destroy())
  .then(res.sendStatus(204))
  .catch(next)
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})


module.exports = router
