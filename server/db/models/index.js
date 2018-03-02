const User = require('./user')
const Order = require('./order')
const Category = require('./category')
const Product = require('./product')
const Review = require('./review')
const Cart = require('./cart')
const Cart_products = require('./cart_products')
const Order_products = require('./order_products')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */


//associations

//user shopping cart
Cart.belongsTo(User)



Order_products.belongsTo(Cart)
Order_products.belongsTo(Product)
Order_products.belongsTo(Order)

//user order table
// Order.hasMany(Order_products)


// add categoryId to products table
Product.belongsTo(Category)




//order/product table -- create
Order.belongsToMany(Product, { through: 'order_products' })
Product.belongsToMany(Order, { through: 'order_products' })


//cart/product table
Cart.belongsToMany(Product, { through: 'cart_products' })
Product.belongsToMany(Cart, { through: 'cart_products' })


// //category table
// Product.belongsToMany(Category, { through: 'product_category' } )
// Category.belongsToMany(Product, { through: 'product_category' } )


//review table
Review.belongsTo(User)
Review.belongsTo(Product)



module.exports = {
  User,
  Order,
  Category,
  Product,
  Review,
  Cart,
  Cart_products,
  Order_products
}
