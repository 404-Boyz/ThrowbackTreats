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
              <h1>Welcome, {email}  &nbsp;&nbsp;<span>Admin</span></h1>
              <p>Lorem ipsum dolor sit amet, his case mucius salutandi ne, dicat blandit sed te. Magna propriae pri at. Ius et velit intellegat, an sea nisl noster. Ipsum ancillae an ius, nam ad alienum abhorreant, mei at quem tale percipitur. No probo simul accumsan has. Eum inimicus indoctum argumentum eu, pri atqui vidisse ad.</p>
              <div>
                <br />
                <hr />
                <br />
                <Link to='/allorders'><Button primary>Orders</Button></Link>
                <Link to='/allusers'><Button primary>Users</Button></Link>
                <Button primary>Reviews</Button>
                <Button primary>Products</Button>
                <Button primary>Categories</Button>


              </div>
            </Container>
          </div>
        </div>
        :
        <div>
          <div className="dashboard-wrapper">
            <div className="dashboard">
              <Image src="/img/billTed.png" />
              <Container fluid>
                <h1>Welcome, {email}  &nbsp;&nbsp;<span>User</span></h1>
                <p>Lorem ipsum dolor sit amet, his case mucius salutandi ne, dicat blandit sed te. Magna propriae pri at. Ius et velit intellegat, an sea nisl noster. Ipsum ancillae an ius, nam ad alienum abhorreant, mei at quem tale percipitur. No probo simul accumsan has. Eum inimicus indoctum argumentum eu, pri atqui vidisse ad.</p>
                <div>
                  <br />
                  <hr />
                  <br />
                  <Link to={`orders/users/${props.id}`}><Button primary>My Orders</Button></Link>
                  <Button primary>My Reviews</Button>
                </div>
              </Container>
            </div>
          </div>
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
