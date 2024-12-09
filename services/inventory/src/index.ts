import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "./secret/secret";
import "dotenv/config";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const service_name = process.env.SERVICE_NAME || "Inventory_service";

app.get("/", (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      code: 200,
      message: "Server is running ",
    });
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`${service_name} is running at http://localhost:${PORT} `);
});
