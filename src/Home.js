import React from 'react';
import './Home.css';
import Product from './Product';

function Home() {
    return (
        <div className="home_container">
            <img className="home__image" src="./images/Background1.jpg" alt=""/>
            <div className="home__row">
                <Product id="421" title="The Lean StartUp: How Constant Innovation Creates Radically Sucessful Businsesses Paperback" price={19.99} rating={4} image="./images/theleanstartup.jpg" />
                <Product id="422" title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl" price={239.0} rating={3} image="./images/kenwood.jpg"/>
            </div>
            <div className="home__row">
                <Product id="521" title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor" price={98.99} rating={5} image="./images/samsungWatch.jpg"/>
                <Product id="522" title="Amazon Echo (3rd generation) | Smart speaker with Alexa, charcoal fabrics" price={98.99} rating={5} image="./images/echo.jpg" />
                <Product id="523" title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128gb) - Silver (4th Generation)" price={598.99} rating={4} image="./images/iPad.jpg"/>
            </div>
            <div className="home__row">
            <Product id="621" title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor" price={1094.98} rating={4} image="./images/samsungMonitor.jpg"/>
            </div>
        </div>
    )
}

export default Home
