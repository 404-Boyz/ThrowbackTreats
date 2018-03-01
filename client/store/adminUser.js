import axios from 'axios';

const REMOVE_USER = 'REMOVE_USER';
const RESET_PASSWORD = 'RESET_PASSWORD';
const PROMOTE_USER = 'PROMOTE_USER';

// --ACTION CREATORS--

const removeUser = user => ({ type: REMOVE_USER, user });
const promoteUser = user => ({ type: PROMOTE_USER, user });

// Hmmm...does this need to be in the store?
// const resetPassword =





// const CHANGE_ORDER_STATUS =
// const VIEW_ORDER_DETAIL =
// const FILTER_ORDERS =
// const GET_ORDERS =
// const MANAGE_INVENTORY =

// const ADD_CATEGORY =
// const EDIT_CATEGORY =
