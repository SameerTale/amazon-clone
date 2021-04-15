import React, { useEffect } from "react";
import './App.css';
import Header from './Header.js';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from "./Checkout";
import Payment from "./Payment";
import Orders from "./Orders";
import { useStateValue } from "./StateProvider";
import Login from "./Login";
import { auth } from "./firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51IfowtSAlKKXnx82IEHaVeF2FkJEmepEz7HCXfcVtxn3HrwQBZbUqexn4PjdZY3blzImeTfHlECTA2N3a8wPfac000Kbeg7Yfb");

function AppFrame() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/orders">
          <Orders />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/payment">
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </React.Fragment >
  );
}

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route component={AppFrame}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
