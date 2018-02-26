const User = require('./user')
const Order = require('./order')
const Category = require('./category')
const Product = require('./product')
const Review = require('./review')

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

User.hasMany(Order)
Order.hasMany(Product)
Product.hasMany(Review)

Product.belongsToMany(Category, { through: 'product_category' } )
Category.belongsToMany(Product, { through: 'product_category' } )

Order.belongsTo(User)
Review.belongsTo(User)

module.exports = {
  User,
  Order,
  Category,
  Product,
  Review
}
