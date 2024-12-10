import { handleCreateInventory } from "@/controller/createInventory";
import { Router } from "express";

const inventoryRouter: Router = Router();

inventoryRouter.post("/", handleCreateInventory);

export default inventoryRouter;
