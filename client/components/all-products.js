import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Icon, Image } from 'semantic-ui-react'

const AllProducts = (props) => {

    return (
        <div id="product-wrapper">
            {console.log(props)}
            <h1>All Products</h1>
            <div className="productsContainer" >
                {
                    props.products.map(product => {
                        return (
                            <Card key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                    <Image src={product.photoUrl} />
                                </Link>
                                <Card.Content>
                                    <Link to={`/products/${product.id}`}>
                                        <Card.Header>
                                            {product.title}
                                        </Card.Header>
                                    </Link>
                                    <Card.Meta>
                                        <span className='date'>
                                            {product.category}
                                        </span>
                                    </Card.Meta>
                                    <Card.Description>
                                        {product.description}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon name='dollar' />
                                    {product.price}
                                </Card.Content>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

const mapState = (state) => {
    return {
        products: state.product
    }
}

export default connect(mapState)(AllProducts)