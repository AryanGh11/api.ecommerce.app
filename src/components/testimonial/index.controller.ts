import ErrorHandler from "../../libraries/error-handler";

import { TestimonialService } from "./index.service";
import { Router, Request, Response } from "express";
import { validateCreate, validateGetOne, validateUpdate } from "./api";
import { resourceSuccessfullyDeleted } from "../../constants/resourceSuccessfullyDeleted";

import {
  ITestimonialCreatePayload,
  ITestimonialUpdatePayload,
} from "./index.interfaces";

export const router = Router();

const service = new TestimonialService();

// Get all testimonials
router.get("/", async (req: Request, res: Response) => {
  try {
    const testimonials = await service.getAll();
    res.json(testimonials);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Get testimonial by id
router.get("/:id", validateGetOne, async (req: Request, res: Response) => {
  try {
    const testimonial = await service.getOne(req.params.id);
    res.json(testimonial);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Create a new testimonial
router.post("/", validateCreate, async (req: Request, res: Response) => {
  try {
    const payload: ITestimonialCreatePayload = req.body;
    const testimonial = await service.create(payload);
    res.json(testimonial);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Update a testimonial
router.put("/:id", validateUpdate, async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const payload: ITestimonialUpdatePayload = req.body;
    const testimonial = await service.update({
      id,
      payload,
    });
    res.json(testimonial);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Delete a testimonial
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await service.delete(req.params.id);
    res.json({ message: resourceSuccessfullyDeleted });
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});
