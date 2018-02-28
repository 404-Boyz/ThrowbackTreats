import axios from 'axios';

const GET_PRODUCT = 'GET_PRODUCT';
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const GET_BY_CATEGORY = 'GET_BY_CATEGORY';

// --ACTION CREATORS--
const getProduct = product => ({ type: GET_PRODUCT, product })
const removeProduct = product => ({ type: REMOVE_PRODUCT, product })
const editProduct = product => ({ type: EDIT_PRODUCT, product })
const getProducts = products => ({ type: GET_ALL_PRODUCTS, products })
const addProduct = product => ({ type: ADD_PRODUCT, product })
const getByCategory = products => ({ type: GET_BY_CATEGORY, products })

//THUNK CREATORS//

export const getAllProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => dispatch(getProducts(res.data)))
    .catch(err => console.error(err))
}

export const getSingleProduct = (id) => dispatch => {
  axios.get(`/api/products/${id}`)
    .then(res => dispatch(getProduct(res.data)))
    .catch(err => console.error(err))
}

export const addSingleProduct = (product) => dispatch => {
  axios.post('/api/products', product)
    .then(res => dispatch(addProduct(res.data)))
    .catch(err => console.error(err))
}

export const removeSingleProduct = (id) => dispatch => {
  axios.delete(`/api/products/${id}`)
    .then(res => dispatch(removeProduct(id)))
    .catch(err => console.error(err));
}

export const editSingleProduct = (id, product) => dispatch => {
  axios.put(`/api/products/${id}`, product)
    .then(res => dispatch(editProduct(res.data)))
    .catch(err => console.error(err));
}

export const getProductsByCategory = (category) => dispatch => {
  axios.get(`/api/products/${category}`)
    .then(res => dispatch(getByCategory(res.data)))
    .catch(err => console.error(err));
}

//  REDUCER ---

export default function (products = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    case GET_PRODUCT:
      return action.product
    case EDIT_PRODUCT:
      return products.map((prod) => (
        action.product.id === prod.id ? action.product : prod))
    case ADD_PRODUCT:
      return [...products, action.product]
    case REMOVE_PRODUCT:
      return products.filter((prod) => prod.id !== action.product.id)
    case GET_BY_CATEGORY:
      return products.filter((prod) => prod.category === action.product.category)
    default:
      return products
  }
}

