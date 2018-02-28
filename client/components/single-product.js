import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Rating, Button, Header, Icon, Image, Container, Label } from 'semantic-ui-react'

const Product = (props) => {
    const product = props.products.filter(currentProduct => currentProduct.id === Number(props.match.params.id))[0]
    return (
        <div className="single-product">
            <Image src={product.photoUrl} />
            <Container fluid>
                <Header as='h2'>{product.title}</Header>
                <Label>{product.category}</Label>
                <Rating defaultRating={5} maxRating={5} disabled={true} />
                <Header as='h4'>{product.price}</Header>
                <p>{product.description}</p>
                <Button primary>
                    Buy
            <Icon name='right chevron' />
                </Button>
            </Container>
        </div>

    )
}

const mapState = (state) => {
    return {
        products: state.product
    }
}

export default connect(mapState)(Product)

