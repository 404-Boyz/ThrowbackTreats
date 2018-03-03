const router = require('express').Router()
const db = require('../db')
const { Cart_products, Cart} = require('../db/models')

router.get('/', (req, res, next) => {
  Cart_products.findAll()
    .then(cartProducts => res.json(cartProducts))
    .catch(console.error("Sorry, your cart contents are not available"))
})

router.post('/', (req, res, next) => {
  Cart.findById(req.cookies.cartId)
    .then(cart => {
        Cart_products.create(req.body)
        .then(cartItem => {
            cartItem.update({cartId: cart.id}, {
                where: {
                    id: cartItem.dataValues.id
                }
            })
            res.json(cartItem)
        })
    })
    .catch(console.error("Sorry, cannot add to cart"))
})

module.exports = router
