import axios from 'axios'
import history from '../history'


// users action types
const GET_ALL_USERS = 'GET_ALL_USERS';
const UPDATE_USER = 'UPDATE_USER';
const REMOVE_USER = 'REMOVE_USER'


// users action creators
export const getAllUsers = (users) => {
    const action = { type: GET_ALL_USERS, users }
    return action;
}

export const updateUser = (user) => {
    const action = { type: UPDATE_USER, user }
    return action;
}

export const removeUser = (user) => {
    const action = { type: REMOVE_USER, user }
    return action;
}


// user reducer
export default function reducer(users = [], action) {

    switch (action.type) {

        case GET_ALL_USERS:
            return action.users;

        case UPDATE_USER:
            return users.map(user => (
                action.user.id === user.id ? action.user : user
            ))

        case REMOVE_USER:
            return users.filter(user => user.id !== action.id);

        default:
            return users
    }
}


// user thunks

export const fetchAllUsers = () => dispatch => {
    axios.get('/api/users/allusers')
        .then(res => dispatch(getAllUsers(res.data)))
}

export const updateAUser = (id, user) => dispatch => {
    axios.put(`/api/users/${id}`, user)
        .then(res => dispatch(updateUser(res.data)))
        .catch(err => console.error(`Unable to update ${user}`, err))
}

export const removeAUser = (id, history) => dispatch => {
    axios.delete(`/api/users/${id}`)
        .then(() => {
            dispatch(fetchAllUsers())
            history.push(`/users/`)
        })
        .catch(err => console.error(`Removing user: ${id} unsuccessful`, err))
}