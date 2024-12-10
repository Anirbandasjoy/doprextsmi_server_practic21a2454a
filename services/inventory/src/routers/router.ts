import { handleCreateInventory } from "@/controller/createInventory";
import { handleFindInventories } from "@/controller/findAllInventory";
import { Router } from "express";

const inventoryRouter: Router = Router();

inventoryRouter.post("/", handleCreateInventory);
inventoryRouter.get("/find", handleFindInventories);

export default inventoryRouter;
