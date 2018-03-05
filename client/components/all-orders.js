import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon, Label, Menu, Table, Dropdown } from 'semantic-ui-react'

const AllOrders = (props) => {
    console.log('AllOrders Component hit', props)
    const userOrders = props.orders.filter(userOrder =>
        props.user.id === userOrder.userId)
    console.log('nicks orders: ', userOrders)
    return (
        <div>
            {props.isAdmin ? (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Order ID</Table.HeaderCell>
                            <Table.HeaderCell>Final Price</Table.HeaderCell>
                            <Table.HeaderCell>Order Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            props.orders.map(order => {
                                return (
                                    <Table.Row key={order.id} className="order">
                                        <Table.Cell><Link to={`/orders/${order.id}`}>{order.id}</Link></Table.Cell>
                                        <Table.Cell>{order.price}</Table.Cell>
                                        <Table.Cell><Dropdown placeholder={order.status}>
                                            <Dropdown.Menu>
                                                <Dropdown.Item text="created" />
                                                <Dropdown.Item text="processing" />
                                                <Dropdown.Item text="completed" />
                                                <Dropdown.Item text="cancelled" />
                                            </Dropdown.Menu>
                                        </Dropdown></Table.Cell>
                                    </Table.Row>

                                )
                            })
                        }
                    </Table.Body>
                </Table>
            )
                :
                (<div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Order ID</Table.HeaderCell>
                                <Table.HeaderCell>Final Price</Table.HeaderCell>
                                <Table.HeaderCell>Order Status</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                userOrders.map(order => {
                                    return (
                                        <Table.Row key={order.id} className="order">
                                            <Table.Cell><Link to={`/orders/users/${order.userId}/${order.id}`}>{order.id}</Link></Table.Cell>
                                            <Table.Cell>{order.price}</Table.Cell>
                                            <Table.Cell>{order.status}</Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                    </Table>
                </div>)
            }
        </div>
    )
}

const mapState = (state) => {
    return {
        orders: state.order,
        isLoggedIn: !!state.user.id,
        user: state.user,
        isAdmin: state.user.isAdmin
    }
}

export default connect(mapState)(AllOrders)
