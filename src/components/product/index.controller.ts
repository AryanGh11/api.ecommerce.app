import ErrorHandler from "../../libraries/error-handler";

import { ProductService } from "./index.service";
import { Router, Request, Response } from "express";
import { validateCreate, validateGetOne, validateUpdate } from "./api";
import { resourceSuccessfullyDeleted } from "../../constants/resourceSuccessfullyDeleted";

import {
  IProductCreatePayload,
  IProductUpdatePayload,
} from "./index.interfaces";

export const router = Router();

const service = new ProductService();

// Get all products
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await service.getAll();
    res.json(products);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Get product by id
router.get("/:id", validateGetOne, async (req: Request, res: Response) => {
  try {
    const product = await service.getOne(req.params.id);
    res.json(product);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Create a new product
router.post("/", validateCreate, async (req: Request, res: Response) => {
  try {
    const payload: IProductCreatePayload = req.body;
    const product = await service.create(payload);
    res.json(product);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Update a product
router.put("/:id", validateUpdate, async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const payload: IProductUpdatePayload = req.body;
    const product = await service.update({
      id,
      payload,
    });
    res.json(product);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Delete a product
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await service.delete(req.params.id);
    res.json({ message: resourceSuccessfullyDeleted });
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});
