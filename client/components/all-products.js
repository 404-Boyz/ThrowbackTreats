import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Label, Card, Icon, Image, Search } from 'semantic-ui-react'
import { selectedCategory } from '../store/category'

let categoryMapObject = {
    Food: "food",
    Drinks: "drink",
    Novelty: "novelty"
}


class AllProducts extends Component  {

    constructor(props){
        super(props);
        this.state = {
            search: ''
        };
        this.updateSearch = this.updateSearch.bind(this);
    }


    updateSearch(event){
        this.setState({
            search: event.target.value
        })
    }

    render() {
        //set default to "all" in reducer
            return (
            <div id="product-wrapper">
                <div className="ui fluid category search">
                    <div className="ui icon input">
                        <input className="prompt" type="text" placeholder="Search Products" onChange={this.updateSearch} />
                        <i className="search icon"></i>
                    </div>
                    <div className="results">
                    </div>
                </div>
                <div className="productsContainer" >

                    {
                        this.props.products.filter(product => {
                            let searchBool = product.title.toLowerCase().includes(this.state.search.toLowerCase())
                            let categoryBool;
                            if (this.props.category === "All Products") {
                                categoryBool = true;
                            } else {
                                categoryBool = product.category.title === categoryMapObject[this.props.category]
                            }
                            //filter by category and search
                            return categoryBool && searchBool
                        }).map(product => {
                            return (
                                <Card className="hvr-grow" key={product.id}>
                                    <Link to={`/products/${product.id}`}>
                                        <Image src={product.photoUrl} />
                                    </Link>
                                    <Card.Content>
                                        <Link to={`/products/${product.id}`}>
                                            <Card.Header>
                                                <h2>{product.title}</h2>
                                            </Card.Header>
                                        </Link>
                                        <Card.Meta>
                                            <span className="date">
                                                {product.category.title}
                                            </span>
                                        </Card.Meta>
                                        <Card.Description>
                                            {product.description}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <p>${product.price}</p>
                                    </Card.Content>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        products: state.product,
        category: state.category
    }
}

export default connect(mapState)(AllProducts)
