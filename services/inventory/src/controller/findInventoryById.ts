import prisma from "@/config/prisma";
import { createError } from "@/helper/import";
import { successResponse } from "@/helper/response";
import { Response, Request, NextFunction } from "express";

export const handleFindInventoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const inventory = await prisma.inventory.findUnique({
      where: { id },
      select: {
        quantity: true,
      },
    });
    if (!inventory) {
      return next(createError(404, "inventory not found"));
    }
    successResponse(res, {
      message: "Returned inventory",
      payload: inventory,
    });
  } catch (error) {
    next(error);
  }
};
