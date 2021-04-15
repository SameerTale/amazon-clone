const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51IfowtSAlKKXnx82Gjv7RpsiJ9qCDFCxK7NagaT9ylhMuWchQ0gvxSTQRPRzqSvzUjLYtoJ1iZPFXAdxoZqJ9A5y00nqMZH1xv');

//API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true}));
app.use(express.json());

// - API routes
app.get('/', (request, response) => response.status(200).send("Hello World"));
app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log("payment req received BOOM!!!! for this amount ", total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // sub Units of the currency
        currency: "inr",
        description: "test"
    })
    // OK -Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})


// - Listen command
exports.api = functions.https.onRequest(app);