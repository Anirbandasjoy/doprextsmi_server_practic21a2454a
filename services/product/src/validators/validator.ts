import { Status } from "@prisma/client";
import { z } from "zod";
export const createProductValidator = z.object({
  name: z.string().min(1).max(255),
  sku: z.string().min(1).max(160),
  description: z.string().min(3).max(1000).optional(),
  price: z.number().optional().default(0),
  status: z.nativeEnum(Status).optional().default(Status.DARFT),
});
