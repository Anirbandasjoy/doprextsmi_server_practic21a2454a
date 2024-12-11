import prisma from "@/config/prisma";
import { createError } from "@/helper/import";
import { errorResponse, successResponse } from "@/helper/response";
import { updateINventoryValidateSchema } from "@/validators/validator";
import { Response, Request, NextFunction } from "express";

export const handleUpdateInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const inventory = await prisma.inventory.findUnique({ where: { id } });
    if (!inventory) {
      return next(createError(404, "inventory not found"));
    }
    const parseBody = updateINventoryValidateSchema.safeParse(req.body);
    if (!parseBody.success) {
      return errorResponse(res, {
        message: "Schema validation failed",
        payload: parseBody.error.errors,
      });
    }

    const lastHistory = await prisma.history.findFirst({
      where: { inventoryId: id },
      orderBy: { createdAt: "desc" },
    });

    let newQuantity = inventory.quantity;
    if (parseBody.data.actionType === "IN") {
      newQuantity = inventory.quantity + parseBody.data.quantity;
    } else if (parseBody.data.actionType === "OUT") {
      newQuantity = inventory.quantity - parseBody.data.quantity;
    } else {
      return next(createError(400, "Invalid action type"));
    }

    const updateINventory = await prisma.inventory.update({
      where: { id },
      data: {
        quantity: newQuantity,
        histories: {
          create: {
            actionType: parseBody.data.actionType,
            quantityChanged: parseBody.data.quantity,
            lastQuantity: lastHistory?.newQuantity || 0,
            newQuantity,
          },
        },
      },
      select: {
        id: true,
        quantity: true,
      },
    });
    successResponse(res, {
      message: "Inventory updated successfully",
      payload: updateINventory,
    });
  } catch (error) {
    next(error);
  }
};
