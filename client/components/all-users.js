import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table, Dropdown, Icon } from 'semantic-ui-react'
import { fetchAllUsers, removeAUser } from '../store/index'



class AllUsers extends Component {

    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.props.loadInitialData()
    }

    render() {
        console.log('allUsers', this.props.allUsers)
        return (
            <div>
                {this.props.allUsers &&
                    <div>
                        <div className="dashboard-wrapper">
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>User ID</Table.HeaderCell>
                                        <Table.HeaderCell>User Email</Table.HeaderCell>
                                        <Table.HeaderCell>Admin Status</Table.HeaderCell>
                                        <Table.HeaderCell>Delete User</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        this.props.allUsers.map(user => {
                                            const adminOptions = [
                                                { key: 'true', text: 'true', value: 'true' },
                                                { key: 'false', text: 'false', value: 'false' },
                                            ];
                                            console.log(user.isAdmin)
                                            return (
                                                <Table.Row key={user.id} className="dash-row" value={user.id}>
                                                    <Table.Cell>{user.id}</Table.Cell>
                                                    <Table.Cell>{user.email}</Table.Cell>
                                                    <Table.Cell>

                                                        <Dropdown name="admin" placeholder={user.isAdmin.toString()} onChange={this.handleAdmin} fluid selection options={adminOptions} />
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Icon onClick={() => this.handleRemove(user.id)} name='remove circle' size='large' />
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    }
                                </Table.Body>

                            </Table>
                        </div>
                    </div>
                }
            </div>
        )
    }

    handleRemove(userId) {
        this.props.remove(userId, this.props.history)
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
        },
        remove(userId, history) {
            dispatch(removeAUser(userId, history))
        }

    }
}

export default connect(mapState, mapDispatch)(AllUsers)
