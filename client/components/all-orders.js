import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon, Label, Menu, Table, Dropdown } from 'semantic-ui-react'
import { changeOrderStatus } from '../store/index'


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
                                const orderOptions = [
                                    { key: 1, value: 'created', text: 'created' },
                                    { key: 2, value: 'processing', text: 'processing' },
                                    { key: 3, value: 'completed', text: 'completed' },
                                    { key: 4, value: 'canceled', text: 'canceled' }
                                ];
                                return (
                                    <Table.Row key={order.id} className="order" value={order.id}>
                                        <Table.Cell><Link to={`/orders/${order.id}`}>{order.id}</Link></Table.Cell>
                                        <Table.Cell>{order.price}</Table.Cell>
                                        <Table.Cell>
                                            <Dropdown placeholder={order.status} onChange={props.onChange} fluid selection options={orderOptions} />
                                        </Table.Cell>
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

const mapDispatch = dispatch => {
    return {
        onChange(evt, { key, value }) {
            dispatch(changeOrderStatus(key, value))
        },

    }
}

export default connect(mapState, mapDispatch)(AllOrders)
