import axios from 'axios';

const GET_ORDERS_TABLE = 'GET_ORDERS_TABLE';
const CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS';

const getOrdersTable = orders => ({ type: GET_ORDERS_TABLE, orders })
const changeStatus = order => ({ type: CHANGE_ORDER_STATUS, order })

export const getTotalledOrders = () => dispatch => {
  axios.get('/api/orders')
    .then(res => dispatch(getOrdersTable(res.data)))
    .catch(err => console.error(err))
}

export const changeOrderStatus = (id, order) => dispatch => {
  console.log('id: ', id, 'order', order)
  axios.put(`/api/orders/${id}`, { status: order })
    .then(res => {
      console.log('changeorder resdata', res.data)
      dispatch(changeStatus(res.data))
    })
    .catch(err => console.error(err))
}

export default function (orders = [], action) {
  switch (action.type) {
    case GET_ORDERS_TABLE:
      return action.orders
    case CHANGE_ORDER_STATUS:
      return orders.map((ord) => (
        action.order.id === ord.id ? action.order : ord))
    default:
      return orders
  }
}

