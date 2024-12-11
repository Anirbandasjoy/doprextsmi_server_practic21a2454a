import { handleCreateProduct } from "@/controller/createProduct";
import { Router } from "express";

const productRouter: Router = Router();

productRouter.post("/", handleCreateProduct);

export default productRouter;
