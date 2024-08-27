import express from "express";
import authMiddleware from "./authmiddleware";

import { authRouter } from "./components/auth";
import { userRouter } from "./components/user";
import { productRouter } from "./components/product";
import { categoryRouter } from "./components/category";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/categories", authMiddleware, categoryRouter);
router.use("/products", authMiddleware, productRouter);
router.use("/users", authMiddleware, userRouter);

export default router;
