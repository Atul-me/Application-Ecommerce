import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// Create product route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Update product route
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// Get all products route
router.get("/get-product", getProductController);

// Get single product route
router.get("/get-product/:slug", getSingleProductController);

// Get product photo route
router.get("/product-photo/:pid", productPhotoController);

// Delete product route
router.delete('/product/:pid', deleteProductController);

export default router;
