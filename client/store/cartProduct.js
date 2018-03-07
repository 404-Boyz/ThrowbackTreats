import axios from 'axios';
import history from '../history'

const ADD_TO_CART = 'ADD_TO_CART';
const GET_CART = 'GET_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'


// --ACTION CREATORS--
const addToCart = product => ({ type: ADD_TO_CART, product })
const getCart = products => ({ type: GET_CART, products })
const removeItem = productId => ({ type: REMOVE_FROM_CART, productId })


//THUNK CREATORS//

export const addProductToCart = (productId, quantity) => dispatch => {
  axios.post('/api/cart', { productId, quantity })
    .then(res => dispatch(addToCart(res.data)))
    .catch(err => console.error(err))
}

export const showCart = (id) => dispatch => {
  axios.get(`/api/cart/${id}`)
    .then(res => dispatch(getCart(res.data)))
    .catch(err => console.error(err))
}

export const removeCartItem = (productId) => dispatch => {
  axios.delete(`/api/cart/${productId}`)
    .then(res => {
      dispatch(removeItem(productId))
    })
    .catch(err => console.error(err))
}

//  REDUCER ---

export default function (cartProducts = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.products
    case ADD_TO_CART:
      return [...cartProducts, action.product]
    case REMOVE_FROM_CART:
      return cartProducts.filter(product => {
        return product.productId !== action.productId
      })
    default:
      return cartProducts
  }
}

