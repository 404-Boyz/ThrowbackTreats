import axios from 'axios';

const ADD_TO_CART = 'ADD_TO_CART';
const GET_CART = 'GET_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'


// --ACTION CREATORS--
const addToCart = product => ({ type: ADD_TO_CART, product })
const getCart = products => ({type: GET_CART, products})
const removeItem = product => ({type: REMOVE_FROM_CART, product})


//THUNK CREATORS//

export const addProductToCart = ( productId, quantity ) => dispatch => {
  axios.post('/api/cart', { productId, quantity })
    .then(res => dispatch(addToCart(res.data)))
    .catch(err => console.error(err))
}

export const showCart = (id) => dispatch => {
    axios.get(`/api/cart/${id}`)
      .then(res => dispatch(getCart(res.data)))
      .catch(err => console.error(err))
}

export const removeCartItem = (id) => dispatch => {
  axios.delete(`/api/cart/${id}`)
    .then(res => dispatch(removeItem(res.data)))
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
      return cartProducts.filter(product => product !== action.product)
    default:
      return cartProducts
  }
}

