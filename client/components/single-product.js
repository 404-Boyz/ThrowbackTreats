import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Icon, Item, Label } from 'semantic-ui-react'

const Product = (props) => {
    const product = props.products.filter(currentProduct => currentProduct.id === Number(props.match.params.id))[0]
    return (
        <div>
            <Item.Group divided>
                <Item>
                    <Item.Image src={product.photoUrl} />

                    <Item.Content>
                        <Item.Header as='a'>{product.title}</Item.Header>
                        <Item.Meta>
                            <span className='cinema'><Icon name='dollar' />{product.price}</span>
                        </Item.Meta>
                        <Item.Description>{product.description}</Item.Description>
                        <Item.Extra>
                            <Button primary floated='right'>
                                Buy
            <Icon name='right chevron' />
                            </Button>
                            <Label>{product.category}</Label>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group>
        </div>

    )
}

const mapState = (state) => {
    return {
        products: state.product
    }
}

export default connect(mapState)(Product)