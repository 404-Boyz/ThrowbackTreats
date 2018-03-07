import React from 'react'
import Carousel from 're-carousel'
import Products from './all-products'


const Home = () => {
    return (
        <div>
            <div id="carouselContainer">
                <Carousel loop auto>
                    <div className="carouselCard" style={{ backgroundColor: '#fea5be' }}>
                        <div className="carouselText">
                            <h1>WELCOME TO</h1>
                            <h6>Your home for nostalgic nosh</h6>
                        </div>
                    </div>
                    <div className="carouselCard" style={{ background: '#e9f259' }}><h1>So Rad!</h1></div>
                    <div className="carouselCard" style={{ backgroundColor: '#d46ce7' }}><h1>Booyah!</h1></div>
                </Carousel>
            </div>
            <Products />
        </div>
    )
}

export default Home
