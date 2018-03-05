import axios from 'axios';

const GET_ORDERS = 'GET_ORDERS';
// const GET_ORDER = 'GET_ORDER';


// --  ACTION CREATOR  --

const getOrders = orderprods => ({ type: GET_ORDERS, orderprods });


// ---THUNK CREATOR----

export const getAllProductOrders = () => dispatch => {
  axios.get('/api/orderproducts')
    .then(res => dispatch(getOrders(res.data)))
    .catch(err => console.error(err))
}

// export const getSingleOrder = (id) => dispatch => {
//   axios.get(`/api/orders/${id}`)
//     .then(res => dispatch(getOrder(res.data)))
//     .catch(err => console.error(err))
// }

export default function (orderproducts = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orderprods
    default:
      return orderproducts
  }
}
