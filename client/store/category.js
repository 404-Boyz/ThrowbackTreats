const GET_CATEGORY = 'GET_CATEGORY';

//action creator
const getCategory = category => ({ type: GET_CATEGORY, category })

//thunk creator
export const fetchCategory = (category) => dispatch => {
    dispatch(getCategory(category))
}

//reducer
export default function (category = 'All Products', action) {
  switch (action.type) {
    case GET_CATEGORY:
      return action.category
    default:
      return category
  }
}
