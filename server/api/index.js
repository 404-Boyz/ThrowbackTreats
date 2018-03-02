const router = require('express').Router()
const db = require('../db')


router.use('/users', require('./users'));

router.use('/products', require('./products'));

router.use('/orders', require('./orders'));

router.use('/reviews', require('./reviews'))

// router.use('/category', require('./category'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});


module.exports = router;
