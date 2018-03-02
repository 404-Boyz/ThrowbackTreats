const router = require('express').Router()
const User = require('../db/models/user')
const Cart = require('../db/models/cart')

module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
      return user
    })
    .then(user => {
      console.log("YOUR USER ID IS", user.dataValues.id)
      Cart.findOne({
        where: {
          userId: user.dataValues.id
        }
      })
      .then(cart => {
        console.log(cart)
      })
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
      return user
    })
    .then(user => {
      console.log('HERE IS THE USER AFTER SIGNUP', user.dataValues)
      Cart.findById(req.cookies.cartId)
      .then(cart => {
        console.log('HERE IS THE CART LOOKUP TRIGGERED BY A USER SIGNUP', cart.dataValues.id, "HERE IS THE USER", user.dataValues.id);
        Cart.update({userId: user.dataValues.id}, {
          where: {
            id: cart.dataValues.id
          }
        })
      })
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.clearCookie('cartId').redirect('/')
})

router.get('/me', (req, res) => {
  console.log('CART ID ON COOKIE IS', req.cookies.cartId)
  if (!req.cookies.cartId){
    //If a cart Id does not exist on the cookie, Create a cart
    Cart.create(req.sessions)
    .then(cart => {
      // then, assign the cart id to the cookie
      res.cookie('cartId', cart.dataValues.id).json(req.user)
      console.log('added CartId to cookie', req.cookies.cartId)
    })
  } else {
    res.json(req.user)
  }
})

router.use('/google', require('./google'))
