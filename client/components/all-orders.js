import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Icon, Image } from 'semantic-ui-react'

const AllOrders = (props) => {

    return (
        <div id="order-wrapper">
            {console.log(props)}
            <h1>All Orders</h1>
            <div className="productsContainer" >
                {
                    props.orders.map(order => {
                        return (
                            <Card key={order.id}>
                                <Link to={`/orders/${order.id}`}>
                                    <Image src={order.photoUrl} />
                                </Link>
                                <Card.Content>
                                    <Link to={`/orders/${order.id}`}>
                                        <Card.Header>
                                            {order.title}
                                        </Card.Header>
                                    </Link>
                                    <Card.Meta>
                                        <span className='date'>
                                            {order.category}
                                        </span>
                                    </Card.Meta>
                                    <Card.Description>
                                        {order.description}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon name='dollar' />
                                    {order.price}
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
        orders: state.order
    }
}

export default connect(mapState)(AllOrders)
