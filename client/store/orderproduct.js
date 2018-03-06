import axios from 'axios';

const CREATE_ORDER = 'CREATE_ORDER'
const GET_ORDERS = 'GET_ORDERS';
// const GET_ORDER = 'GET_ORDER';


// --  ACTION CREATOR  --

const getOrders = orderprods => ({ type: GET_ORDERS, orderprods });
const newOrder = cartProducts => ({ type: CREATE_ORDER, cartProducts })

// ---THUNK CREATOR----

export const getAllProductOrders = () => dispatch => {
  axios.get('/api/orderproducts')
    .then(res => dispatch(getOrders(res.data)))
    .catch(err => console.error(err))
}

export const createOrder = (cartProducts) => dispatch => {
  axios.post('/api/orderproducts', cartProducts)
    .then((res) => dispatch(newOrder(res.data)))
    .catch(err => console.error(err))
}


// export const getSingleOrder = (id) => dispatch => {
//   axios.get(`/api/orders/${id}`)
//     .then(res => dispatch(getOrder(res.data)))
//     .catch(err => console.error(err))
// }

export default function (orderproducts = [], action) {
  switch (action.type) {
    case CREATE_ORDER:
      console.log('in reducer', orderproducts, 'cartprods', action.cartProducts)
      return [...orderproducts, action.cartProducts]
    case GET_ORDERS:
      return action.orderprods
    default:
      return orderproducts
  }
}
