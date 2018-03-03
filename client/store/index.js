import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import product from './product'
import review from './review'
import cartProduct from './cartProduct'
import order from './order'
import orderproduct from './orderproduct'


const reducer = combineReducers({ user, product, order, review, orderproduct, cartProduct })

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './review'
export * from './order'
export * from './orderproduct'
export * from './cartProduct'

