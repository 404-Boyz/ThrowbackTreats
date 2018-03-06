import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Segment, Image, Container } from 'semantic-ui-react'
import AllOrders from './all-orders'
import { Link } from 'react-router-dom'
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email } = props

  return (
    <div>
      {props.admin === true ?
        <div className="dashboard-wrapper">
          <div className="dashboard">
            <Image src="/img/freshPrince.png" />
            <Container fluid>
              <h1>Welcome, {email}</h1>
              <div>
                <Segment inverted>
                  <Link to='/allorders'><Button basic inverted color='red'>Orders</Button></Link>
                  <Link to='/allusers'><Button basic inverted color='orange'>Users</Button></Link>
                  <Button basic inverted color='yellow'>Reviews</Button>
                  <Button basic inverted color='black'>Products</Button>
                  <Button basic inverted color='blue'>Categories</Button>
                </Segment>
              </div>
            </Container>
          </div>
        </div>
        :
        <div>
          <Segment inverted>
            <Link to={`orders/users/${props.id}`}><Button basic inverted color='red'>My Orders</Button></Link>
            <Button basic inverted color='yellow'>My Reviews</Button>
          </Segment>
        </div>
      }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    admin: state.user.isAdmin,
    email: state.user.email,
    id: state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
