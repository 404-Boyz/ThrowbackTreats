import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Rating, Button, Header, Icon, Image, Container, Label, Breadcrumb, Segment } from 'semantic-ui-react'

const Product = (props) => {
    const product = props.products.filter(currentProduct => currentProduct.id === Number(props.match.params.id))[0];
    const reviews = props.allReviews.filter(currentReview => currentReview.productId === Number(props.match.params.id));
    console.log('reviews', reviews)
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
                    <Button primary>
                        Buy
            <Icon name='right chevron' />
                    </Button>
                </Container>
            </div>
            <div className="reviews">
                <div>
                    <h2>Reviews</h2>
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
        </div >
    )
}

const mapState = (state) => {
    return {
        products: state.product,
        allReviews: state.review

    }
}

export default connect(mapState)(Product)

