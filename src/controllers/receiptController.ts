import {
  JsonController,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  BadRequestError,
  NotFoundError,
} from "routing-controllers";
import { randomUUID } from "crypto";
import { Receipt } from "../interfaces/receipt";
import { ReceiptWithPoints } from "../interfaces/receiptWithPoints";
import { isValidReceipt } from "../utils/validateReceipt";
import { calculatePoints } from "../utils/calculatePoints";

let inMemoryStore: Map<string, ReceiptWithPoints> = new Map();

@JsonController("/receipts")
export class ReceiptController {
  @HttpCode(200)
  @Get("/:id/points")
  async getPointsById(@Param("id") id: string): Promise<{ points: number }> {
    const receipt = inMemoryStore.get(id);
    if (!receipt) {
      throw new NotFoundError("No receipt found for that id");
    }
    return { points: receipt.points };
  }

  @HttpCode(200)
  @Post("/process")
  async process(@Body() receipt: Receipt): Promise<{ id: string }> {
    if (!isValidReceipt(receipt)) {
      throw new BadRequestError("The receipt is invalid`");
    }
    const points = calculatePoints(receipt);
    const uuid = randomUUID();
    inMemoryStore.set(uuid, { ...receipt, points });
    return { id: uuid };
  }
}
