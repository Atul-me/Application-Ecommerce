import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import Order from "../models/orderModel.js";
import PayPal from 'paypal-rest-sdk';

const router = express.Router();

// PayPal Configuration
PayPal.configure({
  mode:'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// Create Payment
router.post("/create-payment", requireSignIn, async (req, res) => {
  const { cart, totalAmount } = req.body;

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: {
          items: cart.map((item) => ({
            name: item.name,
            sku: item._id,
            price: item.price,
            currency: "USD",
            quantity: 1,
          })),
        },
        amount: {
          currency: "USD",
          total: totalAmount,
        },
        description: "Payment for items in the cart",
      },
    ],
  };

  PayPal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json({ paymentID: payment.id });
    }
  });
});

// Execute Payment
router.post("/execute-payment", requireSignIn, async (req, res) => {
  const { paymentID, payerID, cart, totalAmount, userId } = req.body;

  const execute_payment_json = {
    payer_id: payerID,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: totalAmount,
        },
      },
    ],
  };

  PayPal.payment.execute(paymentID, execute_payment_json, async (error, payment) => {
    if (error) {
      res.status(500).send(error);
    } else {
      const order = new Order({
        products: cart.map((item) => item._id),
        payment: payment,
        buyer: userId,
        status: "Processing",
      });
      await order.save();
      res.json({ message: "Payment successful", order });
    }
  });
});

export default router;
