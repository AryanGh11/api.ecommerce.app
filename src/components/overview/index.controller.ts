import ErrorHandler from "../../libraries/error-handler";

import { OverviewService } from "./index.service";
import { Router, Request, Response } from "express";

export const router = Router();

const service = new OverviewService();

// Get overview
router.get("/", async (req: Request, res: Response) => {
  try {
    const overview = await service.get();
    res.json(overview);
  } catch (e) {
    ErrorHandler.handleError(e, res);
  }
});
