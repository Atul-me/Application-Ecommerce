// authController.js

import Order from "../models/orderModel.js"; // Assuming you have an Order model
import User from "../models/userModel.js"; // Assuming you have a User model

// Get all orders for admin
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find().populate('buyer').populate('products');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

// Get orders for a specific user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ buyer: userId }).populate('products');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error });
  }
};
