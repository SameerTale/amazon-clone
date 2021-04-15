import React from 'react';
import { useStateValue } from "./StateProvider";
import './BasketItem.css';

function BasketItem({ item, index, hideButton }) {
    const [{ basket }, dispatch] = useStateValue();
    const { id, title, price, rating, image } = item;
    const removeFromBasket = () => {
        //dispatch the item into thedata layer
        dispatch({
            type: "REMOVE_FROM_BASKET",
            item: index,
        });
    };
    return (
        <div className="basketItem">
            <img src={image} alt="" />
            <div className="basketItem__info">
                <p className="basketItem__title">{title}</p>
                <p className="basketItem__price">
                    <small>Rs</small>
                    <strong>{price}</strong>
                </p>
                <div className="basketItem__rating">
                    {Array(rating).fill().map((_, i) => <p key={i}>⭐</p>)}
                </div>
                
                {hideButton? null : <button onClick={removeFromBasket}>Remove from Basket</button>}
            </div>
        </div>
    )
}

export default BasketItem;
