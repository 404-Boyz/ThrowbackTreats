import axios from 'axios';

const GET_ORDERS = 'GET_ORDERS';
// const GET_ORDER = 'GET_ORDER';
const GET_ORDERS_TABLE = 'GET_ORDERS_TABLE'

// --  ACTION CREATOR  --

const getOrders = orderprods => ({ type: GET_ORDERS, orderprods });
const getOrdersTable = orders => ({ type: GET_ORDERS_TABLE, orders })

// ---THUNK CREATOR----

export const getAllOrders = () => dispatch => {
  axios.get('/api/orders')
    .then(res => dispatch(getOrders(res.data)))
    .catch(err => console.error(err))
}

export const getTotalledOrders = () => dispatch => {
  axios.get('/api/orderstable')
    .then(res => dispatch(getOrdersTable(res.data)))
    .catch(err => console.error(err))
}

// export const getSingleOrder = (id) => dispatch => {
//   axios.get(`/api/orders/${id}`)
//     .then(res => dispatch(getOrder(res.data)))
//     .catch(err => console.error(err))
// }

export default function (orders = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orderprods
    case GET_ORDERS_TABLE:
      return action.orders
    default:
      return orders
  }
}
