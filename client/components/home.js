import React from 'react'
import Carousel from 're-carousel'
import Products from './all-products'


const Home = () => {
    return (
        <div>
            <div id="carouselContainer">
                <Carousel loop auto>
                    <div className="carouselCard" style={{ backgroundColor: 'tomato' }}>
                        <div className="carouselText">
                            <h1>WELCOME TO</h1>
                            <h6>Your home for nostalgic nosh</h6>
                        </div>
                    </div>
                    <div className="carouselCard" style={{ backgroundColor: 'orange' }}>Frame 2</div>
                    <div className="carouselCard" style={{ backgroundColor: 'orchid' }}>Frame 3</div>
                </Carousel>
            </div>
            <Products />
        </div>
    )
}

export default Home
