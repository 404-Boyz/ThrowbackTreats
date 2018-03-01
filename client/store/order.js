import axios from 'axios';

const GET_ORDERS = 'GET_ORDERS';
const GET_ORDER = 'GET_ORDER';

// --  ACTION CREATOR  --

const getOrders = orders => ({ type: GET_ORDERS, orders });
const getOrder = order => ({ type: GET_ORDER, order })

// ---THUNK CREATOR----

export const getAllOrders = () => dispatch => {
  axios.get('/api/orders')
    .then(res => dispatch(getOrders(res.data)))
    .catch(err => console.error(err))
}

export const getSingleOrder = (id) => dispatch => {
  axios.get(`/api/orders/${id}`)
    .then(res => dispatch(getOrder(res.data)))
    .catch(err => console.error(err))
}
