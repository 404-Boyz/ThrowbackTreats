import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import { Button, Form, Segment } from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSignUp, handleLogin, error } = props

  return (
    <div className="formWrapper">
      <div className="formContainer">
        <Segment>
          <h1>{displayName}</h1>
          {displayName === 'Sign Up' ?
            <Form onSubmit={handleSignUp} name={name}>
              <Form.Group widths="equal">
                <Form.Input placeholder="Name" name="userName" type="text" />
                <Form.Input placeholder="Email" name="email" type="email" />
                <Form.Input placeholder="Password" name="password" type="password" />
              </Form.Group>
              <Button primary type="submit">{displayName}</Button>
              {error && error.response && <div> {error.response.data} </div>}
            </Form>
            :
            <Form onSubmit={handleLogin} name={name}>
              <Form.Group widths="equal">
                <Form.Input placeholder="Email" name="email" type="email" />
                <Form.Input placeholder="Password" name="password" type="password" />
              </Form.Group>
              <Button primary type="submit">{displayName}</Button>
              {error && error.response && <div> {error.response.data} </div>}
            </Form>
          }
          <a href="/auth/google">{displayName} with Google</a>
        </Segment>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSignUp(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const name = evt.target.userName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName, name))
    },
    handleLogin(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  error: PropTypes.object
}
