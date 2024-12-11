import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "./secret/secret";
import "dotenv/config";
import { createError } from "./helper/import";
import { errorResponse } from "./helper/response";
import productRouter from "./routers/router";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const service_name = process.env.SERVICE_NAME || "Inventory_service";

app.get("/", (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      code: 200,
      message: `${service_name} is running`,
    });
  } catch (error) {
    next(error);
  }
});

app.use("/product", productRouter);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createError(404, "route not found"));
});

app.use(((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || "An unexpected error occurred";

  errorResponse(res, { statusCode, message, payload: err });
}) as unknown as ErrorRequestHandler);

// app.use(errorMiddleware as unknown as ErrorRequestHandler);

app.listen(PORT, () => {
  console.log(`${service_name} is running at http://localhost:${PORT} `);
});
