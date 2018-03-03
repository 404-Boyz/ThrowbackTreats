import axios from 'axios';

const GET_ORDERS_TABLE = 'GET_ORDERS_TABLE'

const getOrdersTable = orders => ({ type: GET_ORDERS_TABLE, orders })

export const getTotalledOrders = () => dispatch => {
  axios.get('/api/orders')
    .then(res => dispatch(getOrdersTable(res.data)))
    .catch(err => console.error(err))
}

export default function (orders = [], action) {
  switch (action.type) {
    case GET_ORDERS_TABLE:
      return action.orders
    default:
      return orders
  }
}

