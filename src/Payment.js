import React, {useState, useEffect} from 'react';
import './Payment.css';
import Subtotal from './Subtotal';
import BasketItem from './BasketItem';
import { useStateValue } from './StateProvider';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from './reducer';
import axios from './axios';
import {db} from './firebase';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //Stripe expects the total in currencies subUnits
                url: `/payments/create?total=${getBasketTotal(basket)*100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret)
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) 
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation
            console.log(paymentIntent);
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                })

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders');
        }) 
    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to='/checkout'>{basket?.length} Items</Link>)
                </h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review Items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket?.length > 0 ? basket?.map((item, index) => (<BasketItem key={item.id + "-" + index} item={item} index={index} />)) : <h6>Your basket is empty</h6>}
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* stripe functionality */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment__priceContainer'>
                                <CurrencyFormat renderText={(value) => (
                                    <>
                                        <h3>
                                            Order Total: {value}
                                        </h3>               
                                    </>
                                )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"} thousandSeparator={true}
                                    prefix={"Rs"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>
                                        {processing? <p>Processing...</p> : "Buy Now"}
                                    </span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
