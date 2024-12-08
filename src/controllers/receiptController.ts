import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { ErrorResponse } from "../interfaces/errorResponse";
import { Receipt } from "../interfaces/receipt";
import { ReceiptWithPoints } from "../interfaces/receiptWithPoints";
import { calculatePoints } from "../utils/calculatePoints";
import { isValidReceipt } from "../utils/validateReceipt";

let inMemoryStore: Map<string, ReceiptWithPoints> = new Map();

export const getPointsById = (
  req: Request<{ id: string }, {}, {}>,
  res: Response<{ points: number } | ErrorResponse>
): any => {
  const { id } = req.params;
  const receiptWithPoints = inMemoryStore.get(id);
  if (!receiptWithPoints) {
    return res.status(404).json({ errorMessage: "Not Found" });
  }
  return res.status(200).json({ points: receiptWithPoints.points });
};

export const process = (
  req: Request<{}, {}, Receipt>,
  res: Response<{ id: string } | ErrorResponse>
): any => {
  const receipt = req.body;
  if (!isValidReceipt(receipt)) {
    return res.status(400).json({ errorMessage: "Invalid Receipt" });
  }
  const points = calculatePoints(receipt);
  const uuid = randomUUID();
  inMemoryStore.set(uuid, { ...receipt, points });
  console.log(inMemoryStore);
  return res.status(200).json({ id: uuid });
};
