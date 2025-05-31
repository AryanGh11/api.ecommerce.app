import ErrorHandler from "../../libraries/error-handler";

import { IntroService } from "./index.service";
import { Router, Request, Response } from "express";
import { validateCreate, validateGetOne } from "./api";
import { IIntroCreatePayload } from "./index.interfaces";
import { resourceSuccessfullyDeleted } from "../../constants/resourceSuccessfullyDeleted";

export const router = Router();

const service = new IntroService();

// Get all intros
router.get("/", async (req: Request, res: Response) => {
  try {
    const intros = await service.getAll();
    res.json(intros);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Get intro by id
router.get("/:id", validateGetOne, async (req: Request, res: Response) => {
  try {
    const intro = await service.getOne(req.params.id);
    res.json(intro);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Create a new intro
router.post("/", validateCreate, async (req: Request, res: Response) => {
  try {
    const payload: IIntroCreatePayload = req.body;
    const intro = await service.create(payload);
    res.json(intro);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});

// Delete an intro
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await service.delete(req.params.id);
    res.json({ message: resourceSuccessfullyDeleted });
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});
