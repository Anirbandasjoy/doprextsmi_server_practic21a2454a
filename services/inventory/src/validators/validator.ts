import { ActionType } from "@prisma/client";
import { z } from "zod";

export const createInventoryValidateSchema = z.object({
  productId: z.string().min(1).max(255),
  sku: z.string(),
  quantity: z.number().int().default(0),
});

export const updateINventoryValidateSchema = z.object({
  quantity: z.number().int(),
  actionType: z.nativeEnum(ActionType),
});
