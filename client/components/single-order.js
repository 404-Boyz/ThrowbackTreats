import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

const SingleOrder = (props) => {
  console.log('singleorder hit', props)
  const order = props.orders.filter(currentorder => currentorder.id === Number(props.match.params.id))[0]
  return (
    <div>
      {props.isAdmin ? (<div><h2>{`UserId/SessionId: ${order.cart.userId}/${order.cart.sessionId}, Order Number: ${order.order.id}`}</h2>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product ID</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Inventory</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row className="order">
              <Table.Cell>{order.product.id}</Table.Cell>
              <Table.Cell><img src={order.product.imageUrl} /></Table.Cell>
              <Table.Cell>{order.quantity}</Table.Cell>
              <Table.Cell>{order.price}</Table.Cell>
              <Table.Cell>{order.product.inventoryQuantity}</Table.Cell>
            </Table.Row>
            }
      </Table.Body>
        </Table>}
      </div>)
        :
        <div></div>
      }
    </div>
  )
}

const mapState = (state) => {
  return {
    orders: state.order,
    isAdmin: state.user.isAdmin,
  }
}

export default connect(mapState)(SingleOrder)
