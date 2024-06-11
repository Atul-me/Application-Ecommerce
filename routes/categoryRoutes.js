import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deletecategoryController,
  singlecategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes
//create-category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
//update-category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
//getall-category
router.get("/get-category", categoryController);
//single-category
router.get("/single-category/:slug", singlecategoryController);
//delete-category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deletecategoryController);

export default router;
