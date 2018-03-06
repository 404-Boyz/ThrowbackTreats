import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { Icon, Dropdown, Menu } from 'semantic-ui-react'
import { fetchCategory } from '../store/category'


const Navbar = ({ handleCategory, handleClick, isLoggedIn, user }) => (
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
              <Dropdown.Menu onClick={handleCategory}>
                <Dropdown.Header>Categories</Dropdown.Header>
                <Dropdown.Item><Link to="/products">All Products</Link></Dropdown.Item>
                <Dropdown.Item><Link to="/food">Food</Link></Dropdown.Item>
                <Dropdown.Item>Drinks</Dropdown.Item>
                <Dropdown.Item>Novelty</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Menu position="right">
              <Menu.Item>
                <Link to="/home">Hello, {user.name}</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="" onClick={handleClick}>Log Out</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/cart"><Icon name='cart' size='large' /></Link>
              </Menu.Item>
            </Menu.Menu>
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
                <Dropdown.Menu onClick={handleCategory}>
                  <Dropdown.Header>Categories</Dropdown.Header>
                  <Dropdown.Item><Link to="/products">All Products</Link></Dropdown.Item>
                  <Dropdown.Item>Food</Dropdown.Item>
                  <Dropdown.Item>Drinks</Dropdown.Item>
                  <Dropdown.Item>Novelty</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Menu position="right">
                <Menu.Item>
                  <Link to="/login">Login</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/signup">Sign Up</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/cart"><Icon name='cart' size='large' /></Link>
                </Menu.Item>
              </Menu.Menu>
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
    },
    //this sets the category to state in the store
    handleCategory(event) {
      let category = event.target.innerHTML
      dispatch(fetchCategory(category))
    }
  }
}


export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleCategory: PropTypes.func.isRequired
}
