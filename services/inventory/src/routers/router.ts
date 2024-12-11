import { handleCreateInventory } from "@/controller/createInventory";
import { handleFindInventories } from "@/controller/findAllInventory";
import { handleUpdateInventory } from "@/controller/updateInventory";
import { Router } from "express";

const inventoryRouter: Router = Router();

inventoryRouter.post("/", handleCreateInventory);
inventoryRouter.get("/find", handleFindInventories);
inventoryRouter.put("/update", handleUpdateInventory);

export default inventoryRouter;
