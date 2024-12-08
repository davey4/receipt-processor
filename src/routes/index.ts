import { Router } from "express";
import { receiptRouter } from "./receiptRoute";

const router = Router();

// Define Routes
router.use("/receipts", receiptRouter);

export default router;
