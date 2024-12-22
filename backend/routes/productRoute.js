import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updatedProduct,
} from "../controller/productController.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updatedProduct);

router.delete("/:id", deleteProduct);

export default router;
