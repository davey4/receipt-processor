import { Router } from "express";
import { getPointsById, process } from "../controllers/receiptController";

const router = Router();

router.get("/:id/points", getPointsById);
router.post("/process", process);

export { router as receiptRouter };
