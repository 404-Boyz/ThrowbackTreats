import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table, Dropdown, Icon, Button } from 'semantic-ui-react'
import { fetchAllUsers, removeAUser, updateAUser } from '../store/index'



class AllUsers extends Component {

    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleAdmin = this.handleAdmin.bind(this);
    }

    componentDidMount() {
        this.props.loadInitialData()
    }

    render() {
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

                                            return (
                                                <Table.Row key={user.id} className="dash-row" value={user.id}>
                                                    <Table.Cell>{user.id}</Table.Cell>
                                                    <Table.Cell>{user.email}</Table.Cell>
                                                    <Table.Cell>

                                                        <Dropdown name="isAdmin" placeholder={user.isAdmin.toString()} onChange={(evt, data) => this.handleAdmin(evt, data, user.id)} fluid selection options={adminOptions} />
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Icon onClick={() => this.handleRemove(user.id)} name='remove circle' size='large' />
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    }
                                </Table.Body>

                                <Table.Footer fullWidth>
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            <Link to="/home"><Button disabled size="small">Back</Button></Link>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                    </Table.Row>
                                </Table.Footer>

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
    handleAdmin(evt, data, userId) {
        let bool = data.value;
        if (bool === 'true') {
            bool = true;
        } else {
            bool = false;
        }
        let admin = { isAdmin: bool }
        this.props.update(userId, admin)
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
        },
        update(userId, user) {
            dispatch(updateAUser(userId, user))
        }

    }
}

export default connect(mapState, mapDispatch)(AllUsers)
