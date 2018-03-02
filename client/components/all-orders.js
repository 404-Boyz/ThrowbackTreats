import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const AllOrders = (props) => {
    // const { quantity, price, cart, product, order } = props.orders;
    console.log('Component hit', props)
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>User ID</Table.HeaderCell>
                    <Table.HeaderCell>Session ID</Table.HeaderCell>
                    <Table.HeaderCell>Final Price</Table.HeaderCell>
                    <Table.HeaderCell>Order Status</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    props.orders.map(order => {
                        return (
                            <Table.Row key={order.order.id} className="order">
                                <Table.Cell>{order.cart.userId}</Table.Cell>
                                <Table.Cell>{order.cart.sessionId}</Table.Cell>
                                <Table.Cell>{order.order.price}</Table.Cell>
                                <Table.Cell>{order.order.status}</Table.Cell>
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='3'>
                        <Menu floated='right' pagination>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a'>1</Menu.Item>
                            <Menu.Item as='a'>2</Menu.Item>
                            <Menu.Item as='a'>3</Menu.Item>
                            <Menu.Item as='a'>4</Menu.Item>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}

const mapState = (state) => {
    return {
        orders: state.order
    }
}

export default connect(mapState)(AllOrders)
