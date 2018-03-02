import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { Icon, Dropdown, Menu } from 'semantic-ui-react'

const Navbar = ({ handleClick, isLoggedIn, user }) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links before you log in */}
          <Menu>
            <Menu.Item>
              <a href="/"><h1>Throwback Treats</h1></a>
            </Menu.Item>
            <Dropdown text='Products' pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Header>Categories</Dropdown.Header>
                <Dropdown.Item><Link to="/products">All Products</Link></Dropdown.Item>
                <Dropdown.Item>Food</Dropdown.Item>
                <Dropdown.Item>Drinks</Dropdown.Item>
                <Dropdown.Item>Novelty</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>
              Hello, {user.name}
            </Menu.Item>
            <Menu.Item>
              <Link to="" onClick={handleClick}>Log Out</Link>
            </Menu.Item>
            <Menu.Item>
              <Icon name='cart' size='large' />
            </Menu.Item>
          </Menu>
        </div>
      ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Menu>
              <Menu.Item>
                <a href="/"><h1>Throwback Treats</h1></a>
              </Menu.Item>
              <Dropdown text='Products' pointing className='link item'>
                <Dropdown.Menu>
                  <Dropdown.Header>Categories</Dropdown.Header>
                  <Dropdown.Item><Link to="/products">All Products</Link></Dropdown.Item>
                  <Dropdown.Item>Food</Dropdown.Item>
                  <Dropdown.Item>Drinks</Dropdown.Item>
                  <Dropdown.Item>Novelty</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Item>
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/signup">Sign Up</Link>
              </Menu.Item>
              <Menu.Item>
                <Icon name='cart' size='large' />
              </Menu.Item>
            </Menu>
          </div>
        )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
