import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllProducts, me, showCart, removeCartItem, createOrder } from '../store'
import { Item, Button, Checkout, Icon, Table } from 'semantic-ui-react'

class Cart extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.loadInitialData();
    }

    render() {

        console.log(this.props);
        return (
            <div className="cart-container">
                <Table celled compact definition>
                    <Table.Header fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Unit Price</Table.HeaderCell>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Remove</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>


                    <Table.Body>
                        {
                            this.props.cartProducts.map(cartItem => {
                                return (

                                    <Table.Row className="cart-row" key={cartItem.productId}>
                                        <Table.Cell collapsing>
                                            <img className="cartPhoto" src={this.props.products.filter(product => product.id === cartItem.productId)[0].photoUrl} />
                                        </Table.Cell>
                                        <Table.Cell><h2>{this.props.products.filter(product => product.id === cartItem.productId)[0].title}</h2></Table.Cell>
                                        <Table.Cell>${this.props.products.filter(product => product.id === cartItem.productId)[0].price}</Table.Cell>
                                        <Table.Cell>{cartItem.quantity}</Table.Cell>
                                        <Table.Cell><button onClick={() => { this.props.removeFromCart(cartItem.productId) }}><Icon name='remove circle' size='large' /></button></Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>


                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan="4">
                                <Button onClick={() => this.props.checkoutHandler(this.props.cartProducts)} floated="right" icon labelPosition="left" primary size="small">
                                    <Icon name="in cart" /> Checkout
                    </Button>
                                <Button size="small">Continue Shopping</Button>
                                <Button disabled size="small">Clear Cart</Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>

        )
    }
}

const mapState = (state, ownProps) => {
    return {
        isLoggedIn: !!state.user.id,
        products: state.product,
        userId: state.user.id,
        cartProducts: state.cartProduct
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(showCart(Number(document.cookie.slice(7))));
            dispatch(getAllProducts());
        },
        checkoutHandler(props) {
            dispatch(createOrder(props));
        },
        removeFromCart(id) {
            dispatch(removeCartItem(id));
        }

    }
};

export default withRouter(connect(mapState, mapDispatch)(Cart))

