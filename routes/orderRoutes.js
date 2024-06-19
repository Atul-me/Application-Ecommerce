import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { getAllOrdersController, getUserOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

// Admin route to get all orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);

// User route to get their own orders
router.get('/orders', requireSignIn, getUserOrders);

// Route to update order status
router.put('/order-status/:orderId', requireSignIn, isAdmin, updateOrderStatus);

export default router;
