import { Request, Response, NextFunction } from "express";
import prisma from "@/config/prisma";
import { createInventoryValidateSchema } from "@/validators/validator";

import { errorResponse, successResponse } from "@/helper/response";
import { createError } from "@/helper/import";
export const handleCreateInventory = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<any> => {
  const parseBody = createInventoryValidateSchema.safeParse(req.body);
  if (!parseBody.success) {
    return errorResponse(_res, {
      message: "Schema validation failed",
      payload: parseBody.error.errors,
    });
  }
  const inventory = await prisma.inventory.create({
    data: {
      ...parseBody.data,
      histories: {
        create: {
          actionType: "IN",
          quantityChanged: parseBody.data.quantity,
          newQuantity: parseBody.data.quantity,
          lastQuantity: 0,
        },
      },
    },
    select: {
      id: true,
      quantity: true,
    },
  });
  if (!inventory) {
    return next(createError(400, "Inventory not created"));
  }

  successResponse(_res, {
    statusCode: 201,
    message: "Inventory successfully created",
    payload: inventory,
  });
  try {
  } catch (error) {
    next(error);
  }
};
