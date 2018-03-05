import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllProducts, me, getAllReviews, addSingleReview, addProductToCart } from '../store'
import { Rating, Button, Header, Icon, Image, Container, Label, Breadcrumb, Segment, Modal, Form, Dropdown, Select } from 'semantic-ui-react'

class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedQuantity: 0,
            modalOpen: false,
            productRating: props.reviews.map(review => review.rating).reduce((a, b) => a + b, 0) / props.reviews.length,
        }
        this.handleClose = this.handleClose.bind(this)
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    inventoryCheck = (evt) => {
        if (+evt.target.value > this.props.product.inventoryQuantity) {
            evt.target.value = this.props.product.inventoryQuantity
        }
    }

    render() {
        console.log(this.props.product)
        return (
            <div className="product-wrapper" >
                <Breadcrumb>
                    <Breadcrumb.Section link to="/">Home</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section link to="/products">Products</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>{this.props.product.title}</Breadcrumb.Section>
                </Breadcrumb>
                <div className="single-product">
                    <Image src={this.props.product.photoUrl} />
                    <Container fluid>
                        <Header as='h2'>{this.props.product.title}</Header>
                        <Rating defaultRating={this.state.productRating} maxRating={5} disabled={true} />
                        <Header as='h4'>{this.props.product.price}</Header>
                        <p>{this.props.product.description}</p>
                        <Label>{this.props.product.category.title}</Label>
                        <br />
                        <Form onSubmit={this.props.addToCart}>
                            <Form.Field>
                                <input name="quantity" type="number" placeholder="0" min="0" max={this.props.product.inventoryQuantity} onChange={this.inventoryCheck} />
                            </Form.Field>
                            <Button primary>Buy<Icon name='right chevron' /></Button>
                        </Form>

                    </Container>
                </div>
                <div className="reviews">
                    <div>
                        <h2>Reviews</h2>
                        <Modal trigger={<Button onClick={this.handleOpen} circular icon='add' />} open={this.state.modalOpen} onClose={this.handleClose} closeIcon>
                            <Header className="reviewModalHead" icon='write' content={`Write A Review for ${this.props.product.title}`} />
                            <Modal.Content>
                                {this.props.isLoggedIn ?
                                    <Form onSubmit={(evt) => { this.props.handleReviewSubmit(evt); this.handleClose() }} className="reviewForm" name={name}>
                                        <Form.Group widths="equal">
                                            <Form.Input placeholder="Title" name="title" type="text" />
                                            <Form.TextArea placeholder="Review" name="description" type="text" />
                                            <Form.Field name="userRating" control='select'>
                                                <option disabled selected>  Product Rating</option>
                                                <option value={5}>&#x2605; &#x2605; &#x2605; &#x2605; &#x2605;</option>
                                                <option value={4}>&#x2605; &#x2605; &#x2605; &#x2605;</option>
                                                <option value={3}>&#x2605; &#x2605; &#x2605;</option>
                                                <option value={2}>&#x2605; &#x2605;</option>
                                                <option value={1}>&#x2605;</option>
                                            </Form.Field>
                                            <Form.Input name="productId" value={this.props.product.id} type="hidden" className="vis-hidden" />
                                            <Form.Input name="userId" value={this.props.userId} type="hidden" className="vis-hidden" />
                                        </Form.Group>
                                        <Button type="submit">Submit</Button>
                                    </Form>
                                    :
                                    <div>
                                        <h2>Dude, so not radical. You gotta be logged in to leave a review!</h2>
                                        <Button.Group>
                                            <Button><Link to="/login">Login</Link></Button>
                                            <Button.Or />
                                            <Button positive closeIcon><Link to="/signup">Sign Up</Link></Button>
                                        </Button.Group>
                                    </div>
                                }
                            </Modal.Content>
                        </Modal>
                        {this.props.reviews[0] !== undefined ?
                            this.props.reviews.map(review => {
                                return (
                                    <div className="review-wrapper" key={review.id}>
                                        <Header as='h3' attached='top'>
                                            {review.title}&nbsp;&nbsp;&nbsp;<Rating defaultRating={review.rating} maxRating={5} disabled={true} />
                                        </Header>
                                        <Segment attached>
                                            {review.description}
                                        </Segment>
                                    </div>
                                )
                            })
                            :
                            <div>
                                <p>Bummer! No reviews for this product yet.</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state, ownProps) => {
    return {
        isLoggedIn: !!state.user.id,
        product: state.product.filter(currentProduct => currentProduct.id === Number(ownProps.match.params.id))[0],
        reviews: state.review.filter(currentReview => currentReview.productId === Number(ownProps.match.params.id)),
        userId: state.user.id
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        handleReviewSubmit(evt) {
            evt.preventDefault()
            const title = evt.target.title.value
            const description = evt.target.description.value
            const rating = evt.target.userRating.value;
            const productId = Number(evt.target.productId.value)
            const userId = Number(evt.target.userId.value)
            dispatch(addSingleReview(title, description, rating, userId, productId, ownProps))
        },
        addToCart(evt) {
            evt.preventDefault()
            const selectedQuantity = evt.target.quantity.value;
            const productId = Number(ownProps.match.params.id);
            dispatch(addProductToCart(productId, selectedQuantity))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Product))

