import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllProducts, me, showCart, removeCartItem, createOrder, getAllProductOrders } from '../store'
import { Item, Button, Icon, Table } from 'semantic-ui-react'

class Checkout extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.loadInitialData();
    }

    render() {
        console.log('props on checkout', this.props)
        return (
            <div>

                {this.props.orderProducts &&
                    <div className="cart-container">
                        <Table celled compact definition>
                            <Table.Header fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell>Product</Table.HeaderCell>
                                    <Table.HeaderCell>Unit Price</Table.HeaderCell>
                                    <Table.HeaderCell>Quantity</Table.HeaderCell>
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
                                            </Table.Row>

                                        )
                                    })

                                }

                            </Table.Body>


                            <Table.Footer fullWidth>

                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell colSpan="4">
                                        <Table.Cell className="totalPrice"><h2 >Total Price: ${Number(this.props.orders.filter(order => order.id === this.props.orderProducts[0].orderId).map(order => order.price)).toFixed(2)} </h2> </Table.Cell>
                                        <Link to="/orderComplete"><Button floated="right" icon labelPosition="left" primary size="small">
                                            <Icon name="in cart" /> Submit Order
                                </Button></Link>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </div>
                } </div>
        )
    }
}

const mapState = (state, ownProps) => {
    return {
        isLoggedIn: !!state.user.id,
        products: state.product,
        userId: state.user.id,
        cartProducts: state.cartProduct,
        orders: state.order,
        orderProducts: state.orderproduct.filter(orderProduct => orderProduct.cartId === (Number(document.cookie.slice(7))))
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(showCart(Number(document.cookie.slice(7))));
            dispatch(getAllProducts());
            dispatch(getAllProductOrders());
        },
        checkoutHandler(props) {
            dispatch(createOrder(props));
        },
        removeFromCart(id) {
            dispatch(removeCartItem(id));
        }

    }
};

export default withRouter(connect(mapState, mapDispatch)(Checkout))

