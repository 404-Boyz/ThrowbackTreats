import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addSingleReview } from '../store'
import { Rating, Button, Header, Icon, Image, Container, Label, Breadcrumb, Segment, Modal, Form, Dropdown, Select } from 'semantic-ui-react'

const Product = (props) => {

    const product = props.products.filter(currentProduct => currentProduct.id === Number(props.match.params.id))[0];
    const reviews = props.allReviews.filter(currentReview => currentReview.productId === Number(props.match.params.id));
    const productRating = reviews.map(review => review.rating).reduce((a, b) => a + b, 0) / reviews.length;
    let quantity = Array.apply(null, { length: product.inventoryQuantity }).map(Function.call, Number).map(number => { return ({ key: number + 1, value: number + 1, text: number + 1 }) })
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
                    <Rating defaultRating={productRating} maxRating={5} disabled={true} />
                    <Header as='h4'>{product.price}</Header>
                    <p>{product.description}</p>
                    <Label>{product.category.title}</Label>
                    <br />
                    <Dropdown placeholder='Quantity' search selection options={quantity} />
                    <Button primary>
                        Buy
            <Icon name='right chevron' />
                    </Button>
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
                                        <Form.Field name="userRating" control='select'>
                                            <option disabled selected>  Product Rating</option>
                                            <option value={5}>&#x2605; &#x2605; &#x2605; &#x2605; &#x2605;</option>
                                            <option value={4}>&#x2605; &#x2605; &#x2605; &#x2605;</option>
                                            <option value={3}>&#x2605; &#x2605; &#x2605;</option>
                                            <option value={2}>&#x2605; &#x2605;</option>
                                            <option value={1}>&#x2605;</option>
                                        </Form.Field>
                                        <Form.Input name="productId" value={product.id} type="hidden" className="vis-hidden" />
                                        <Form.Input name="userId" value={props.userId} type="hidden" className="vis-hidden" />
                                    </Form.Group>
                                    <Button onClick={false} type="submit">Submit</Button>
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
            console.log(evt.target.userRating)
            evt.preventDefault()
            const title = evt.target.title.value
            const description = evt.target.description.value
            const rating = evt.target.userRating.value;
            const productId = Number(evt.target.productId.value)
            const userId = Number(evt.target.userId.value)
            dispatch(addSingleReview(title, description, rating, userId, productId))
        }
    }
}

export default connect(mapState, mapDispatch)(Product)

