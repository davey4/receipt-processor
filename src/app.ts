import "reflect-metadata";
import {
  createExpressServer,
  BadRequestError,
  NotFoundError,
} from "routing-controllers";
import { ReceiptController } from "./controllers/receiptController";

const app = createExpressServer({
  controllers: [ReceiptController],
  defaultErrorHandler: false,
});

app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof BadRequestError || err instanceof NotFoundError) {
    return res.status(err.httpCode).json({
      errorMessage: err.message,
    });
  }
  return res.status(500).json({
    errorMessage: "Internal Server Error",
  });
});

export default app;
