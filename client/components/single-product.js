import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addSingleReview, addProductToCart } from '../store'

import { Rating, Button, Header, Icon, Image, Container, Label, Breadcrumb, Segment, Modal, Form, Dropdown } from 'semantic-ui-react'

const Product = (props) => {

    const product = props.products.filter(currentProduct => currentProduct.id === Number(props.match.params.id))[0];
    const reviews = props.allReviews.filter(currentReview => currentReview.productId === Number(props.match.params.id));
    let quantity = Array.apply(null, {length: product.inventoryQuantity}).map(Function.call, Number).map(number => { return ({key: number+1, value: number+1, text: number+1 })})
    return (
        <div className="product-wrapper" >
            <Breadcrumb>
                <Breadcrumb.Section link to="/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section link to="/products">Products</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>{product.title}</Breadcrumb.Section>
            </Breadcrumb>
            <div className="single-product">
                <Image src={product.photoUrl} />
                <Container fluid>
                    <Header as='h2'>{product.title}</Header>
                    <Label>{product.category.title}</Label>
                    <br />
                    <Rating defaultRating={5} maxRating={5} disabled={true} />
                    <Header as='h4'>{product.price}</Header>
                    <p>{product.description}</p>
                    <Form onSubmit={props.addToCart}> 
                        <Dropdown placeholder='Quantity' search selection options={quantity} />
                        <Button  type='submit' primary>
                            Buy
                        <Icon name='right chevron' />
                        </Button>
                    </Form>
                </Container>
            </div>
            <div className="reviews">
                <div>
                    <h2>Reviews</h2>
                    <Modal trigger={<Button circular icon='add' />} closeIcon>
                        <Header className="reviewModalHead" icon='write' content={`Write A Review for ${product.title}`} />
                        <Modal.Content>
                            {props.isLoggedIn ?
                                <Form onSubmit={props.handleReviewSubmit} className="reviewForm" name={name}>
                                    <Form.Group widths="equal">
                                        <Form.Input placeholder="Title" name="title" type="text" />
                                        <Form.TextArea placeholder="Review" name="description" type="text" />
                                        <Form.Input name="productId" value={product.id} type="hidden" className="vis-hidden" />
                                        <Form.Input name="userId" value={props.userId} type="hidden" className="vis-hidden" />
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
                    {reviews[0] !== undefined ?
                        reviews.map(review => {
                            return (
                                <div className="review-wrapper" key={review.id}>
                                    <Header as='h3' attached='top'>
                                        {review.title}
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

const mapState = (state) => {
    return {
        isLoggedIn: !!state.user.id,
        products: state.product,
        allReviews: state.review,
        userId: state.user.id
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleReviewSubmit(evt) {
            evt.preventDefault()
            const title = evt.target.title.value
            const description = evt.target.description.value
            const productId = Number(evt.target.productId.value)
            const userId = Number(evt.target.userId.value)
            dispatch(addSingleReview(title, description, userId, productId))
        },
        addToCart(evt, result) {
            evt.preventDefault()
            const quantity = 16 //get the quantity from the dropdown somehow
            const productId = window.location.pathname.slice((window.location.pathname.lastIndexOf('/') + 1));
            dispatch(addProductToCart(productId, quantity))
        }
    }
}

export default connect(mapState, mapDispatch)(Product)

