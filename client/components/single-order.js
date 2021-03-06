import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

const SingleOrder = (props) => {
  if (props.orders) {
    console.log('singleorder hit', props)

    const order = props.orders.filter(currentorder =>
      currentorder.order.id === Number(props.match.params.id));

    console.log('order :', order);

    return (
      <div>
        {props.isAdmin ? (<div><h2>{`UserId/SessionId: ${order[0].cart.userId}/${order[0].cart.sessionId}, Order Number: ${order[0].order.id}`}</h2>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Product ID</Table.HeaderCell>
                <Table.HeaderCell>Product</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Remaining Inventory</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                order.map(ord => {
                  return (

                    <Table.Row key={ord.product.id} className="order">
                      <Table.Cell>{ord.product.id}</Table.Cell>
                      <Table.Cell>{ord.product.title}</Table.Cell>
                      <Table.Cell>{ord.quantity}</Table.Cell>
                      <Table.Cell>{ord.price}</Table.Cell>
                      <Table.Cell>{ord.product.inventoryQuantity}</Table.Cell>
                    </Table.Row>

                  )
                })
              }

            </Table.Body>
          </Table>
        </div>)
          :
          (<div>
            <h2>{`Name: ${props.user.name}, Order Number: ${order[0].order.id}`}</h2>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Product ID</Table.HeaderCell>
                  <Table.HeaderCell>Product</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {
                  order.map(ord => {
                    return (

                      <Table.Row key={ord.product.id} className="order">
                        <Table.Cell>{ord.product.id}</Table.Cell>
                        <Table.Cell>{ord.product.title}</Table.Cell>
                        <Table.Cell>{ord.quantity}</Table.Cell>
                        <Table.Cell>{ord.price}</Table.Cell>
                      </Table.Row>

                    )
                  })
                }

              </Table.Body>
            </Table></div>)
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    orders: state.orderproduct,
    isAdmin: state.user.isAdmin,
    user: state.user
  }
}

export default connect(mapState)(SingleOrder)
