import axios from 'axios';

const GET_REVIEW = 'GET_REVIEW';
const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS'
const REMOVE_REVIEW = 'REMOVE_REVIEW';
const EDIT_REVIEW = 'EDIT_REVIEW';
const ADD_REVIEW = 'ADD_REVIEW';

// --ACTION CREATORS--
const getReview = review => ({ type: GET_REVIEW, review })
const removeReview = review => ({ type: REMOVE_REVIEW, review })
const editReview = review => ({ type: EDIT_REVIEW, review })
const getReviews = reviews => ({ type: GET_ALL_REVIEWS, reviews })
const addReview = review => ({ type: ADD_REVIEW, review })

//THUNK CREATORS//

export const getAllReviews = () => dispatch => {
    axios.get('/api/reviews')
        .then(res => dispatch(getReviews(res.data)))
        .catch(err => console.error(err))
}

export const getSingleReview = (id) => dispatch => {
    axios.get(`/api/reviews/${id}`)
        .then(res => dispatch(getReview(res.data)))
        .catch(err => console.error(err))
}

export const addSingleReview = (title, description, rating, userId, productId, ownProps) => dispatch => {
    console.log('ownProps', ownProps)
    axios.post('/api/reviews', { title, description, rating, userId, productId })
        .then(res => dispatch(addReview(res.data)))
        .catch(err => console.error(err))
    // ownProps.history.push(ownProps.match.url)
}

export const removeSingleReview = (id) => dispatch => {
    axios.delete(`/api/reviews/${id}`)
        .then(res => dispatch(removeReview(id)))
        .catch(err => console.error(err));
}

export const editSingleReview = (id, review) => dispatch => {
    axios.put(`/api/reviews/${id}`, review)
        .then(res => dispatch(editReview(res.data)))
        .catch(err => console.error(err));
}

//  REDUCER ---

export default function (reviews = [], action) {
    switch (action.type) {
        case GET_ALL_REVIEWS:
            return action.reviews
        case GET_REVIEW:
            return action.review
        case EDIT_REVIEW:
            return reviews.map((prod) => (
                action.review.id === prod.id ? action.review : prod))
        case ADD_REVIEW:
            return [...reviews, action.review]
        case REMOVE_REVIEW:
            return reviews.filter((prod) => prod.id !== action.review.id)
        default:
            return reviews
    }
}

