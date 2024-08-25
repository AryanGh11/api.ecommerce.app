import express from "express";

import { userRouter } from "./components/user";
import { productRouter } from "./components/product";
import { categoryRouter } from "./components/category";

const router = express.Router();

router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);

export default router;
