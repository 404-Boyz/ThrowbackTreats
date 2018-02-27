const User = require('./user')
const Order = require('./order')
const Category = require('./category')
const Product = require('./product')
const Review = require('./review')
const Cart = require('./cart')
const Cart_products = require('./cart_products')
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

//cart/product table
Cart.belongsToMany(Product, { through: 'cart_products' } )
Product.belongsToMany(Cart, { through: 'cart_products' } )
Cart_products.belongsTo(Order)

//category table
Product.belongsToMany(Category, { through: 'product_category' } )
Category.belongsToMany(Product, { through: 'product_category' } )


//review table
Review.belongsTo(User)
Review.belongsTo(Product)

//user shopping cart
Cart.belongsTo(User)
//user order table
Order.belongsTo(User)


module.exports = {
  User,
  Order,
  Category,
  Product,
  Review
}
