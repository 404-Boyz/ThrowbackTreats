import axios from 'axios';

const ADD_TO_CART = 'ADD_TO_CART';
const GET_CART = 'GET_CART'

// --ACTION CREATORS--
const addToCart = product => ({ type: ADD_TO_CART, product })
const getCart = products => ({type: GET_CART, products})


//THUNK CREATORS//

export const addProductToCart = ( productId, cartId, qty ) => dispatch => {
  axios.post('/api/cart', {productId, cartId, qty})
    .then(res => dispatch(addToCart(res.data)))
    .catch(err => console.error(err))
}

export const showCart = () => dispatch => {
    axios.get('/api/cart')
      .then(res => dispatch(getCart(res.data)))
      .catch(err => console.error(err))
}

//  REDUCER ---

export default function (cartProducts = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.products
    case ADD_TO_CART:
      return [...cartProducts, action.product]
    default:
      return cartProducts
  }
}

