const router = require('express').Router()
const db = require('../db')
const { Cart_products, Cart, Products } = require('../db/models')

router.get('/:id', (req, res, next) => {
  Cart_products.findAll({
      where: {
          cartId: req.params.id
      },
      include: [{
          all: true
      }]
  } )
    .then(cartProducts => res.json(cartProducts))
    .catch(console.error("Sorry, your cart contents are not available"))
})

router.post('/', (req, res, next) => {
  req.body.cartId = req.cookies.cartId;
  Cart.findById(req.cookies.cartId)
    .then(cart => {
        console.log("CART IS", cart)
        Cart_products.create(req.body)
        .then(cartItem => {
            cartItem.update({cartId: cart.id}, {
                where: {
                    id: cartItem.dataValues.id
                }
            })
            // IN THIS SPOT (MAYBE IN A .then? UPDATE QTY OF INVENTORY.. find product and qty from req.body info)
            res.json(cartItem)
        })
    })
    .catch(console.error("Sorry, cannot add to cart"))
})

module.exports = router
