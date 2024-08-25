import ErrorHandler from "../../libraries/error-handler";

import { CategoryService } from "./index.service";
import { Router, Request, Response } from "express";
import { validateCreate, validateGetOne, validateUpdate } from "./api";
import { resourceSuccessfullyDeleted } from "../../constants/resourceSuccessfullyDeleted";

import {
  ICategoryCreatePayload,
  ICategoryUpdatePayload,
} from "./index.interfaces";

export const router = Router();

const service = new CategoryService();

// Get all categories
router.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await service.getAll();
    res.json(categories);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Get category by id
router.get("/:id", validateGetOne, async (req: Request, res: Response) => {
  try {
    const category = await service.getOne(req.params.id);
    res.json(category);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Create a new category
router.post("/", validateCreate, async (req: Request, res: Response) => {
  try {
    const payload: ICategoryCreatePayload = req.body;
    const category = await service.create(payload);
    res.json(category);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Update a category
router.put("/:id", validateUpdate, async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const payload: ICategoryUpdatePayload = req.body;
    const category = await service.update({
      id,
      payload,
    });
    res.json(category);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Delete a category
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await service.delete(req.params.id);
    res.json({ message: resourceSuccessfullyDeleted });
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});
