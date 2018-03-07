const router = require('express').Router()
const db = require('../db')
const { Order_products, Order, Cart } = require('../db/models')

router.get('/', (req, res, next) => {
  Order_products.findAll({ include: { all: true } })
    .then(orderprods => res.json(orderprods))
    .catch(console.error("Sorry, your order products are not available"))
})

router.post('/', (req, res, next) => {
  Order.create()
    .then((order) => {
      Cart.findOne({
        where: {
          id: req.body[0].cartId
        },
        include: { all: true }
      })
        .then((cart) => {
          let totalPrice = 0;
          req.body.forEach(reqBodyProduct => {
            const thisProdPrice = cart.dataValues.products.filter(product => product.dataValues.id === reqBodyProduct.productId)[0].price;
            totalPrice += (+thisProdPrice * reqBodyProduct.quantity);
            reqBodyProduct.price = thisProdPrice;
            reqBodyProduct.orderId = order.id;
            Order_products.create(reqBodyProduct)
          })
          console.log("TOTAL PRICE FOR THE ORDER IS", totalPrice)
          Order.update({userId: cart.user.id, price: totalPrice}, {
            where: {
              id: order.id
            }
          })
        })
    })
    .then((orderprods => res.json(orderprods)))
    .catch(err => console.error(err))
})




//       req.body.forEach((el) =>
//         el.orderId = order.id);
//       console.log('HERE I AM', req.body);
//       return Order_products.bulkCreate(req.body).then(() => Order_products.update({ orderId: order.id }, {
//         where: {
//           cartId: req.cookies.cartId
//         }
//       }))
//     })
//     .then((orderprods) => res.json(orderprods))
//     .catch(err => console.error(err))
// })

// router.get('/:orderId', (req, res, next) => {
//   Order.findById(req.params.id)
//     .then(order => res.json(order))
//     .catch(next)
// })

module.exports = router
