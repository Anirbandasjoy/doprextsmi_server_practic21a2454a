import { handleCreateInventory } from "@/controller/createInventory";
import { handleFindInventories } from "@/controller/findAllInventory";
import { handleFindInventoryById } from "@/controller/findInventoryById";
import { handleGetInventoryDetails } from "@/controller/getInventoryDetails";
import { handleUpdateInventory } from "@/controller/updateInventory";
import { Router } from "express";

const inventoryRouter: Router = Router();

inventoryRouter.post("/", handleCreateInventory);
inventoryRouter.get("/find", handleFindInventories);
inventoryRouter.put("/update/:id", handleUpdateInventory);
inventoryRouter.get("/single/:id/details", handleGetInventoryDetails);
inventoryRouter.get("/single/:id", handleFindInventoryById);

export default inventoryRouter;
