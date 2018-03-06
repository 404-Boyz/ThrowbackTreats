import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table, Checkbox } from 'semantic-ui-react'
import { fetchAllUsers } from '../store/index'


class AllUsers extends Component {

    componentDidMount() {
        this.props.loadInitialData()
    }

    render() {
        console.log('allUsers', this.props.allUsers)
        return (<div> {this.props.allUsers &&
            <div>
                <div className="dashboard-wrapper">
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
                                this.props.allUsers.map(user => {
                                    return (
                                        <Table.Row key={user.id} className="order" value={user.id}>
                                            <Table.Cell>{user.id}</Table.Cell>
                                            <Table.Cell>{user.email}</Table.Cell>
                                            <Table.Cell>
                                                <Checkbox toggle />
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>

                    </Table>
                </div>
            </div>
        } </div>
        )
    }
}

const mapState = (state) => {
    return {
        orders: state.order,
        isLoggedIn: !!state.user.id,
        user: state.user,
        isAdmin: state.user.isAdmin,
        allUsers: state.allUsers
    }
}

const mapDispatch = dispatch => {
    return {
        loadInitialData() {
            dispatch(fetchAllUsers());
        }

    }
}

export default connect(mapState, mapDispatch)(AllUsers)
