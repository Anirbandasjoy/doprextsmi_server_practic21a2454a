import prisma from "@/config/prisma";
import { createError } from "@/helper/import";
import { successResponse } from "@/helper/response";
import { Request, Response, NextFunction } from "express";

export const handleGetInventoryDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const inventory = await prisma.inventory.findUnique({
      where: { id },
      include: {
        histories: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
    if (!inventory) {
      return next(createError(404, "inventory not found"));
    }
    successResponse(res, {
      statusCode: 200,
      message: "Inventory found",
      payload: inventory,
    });
  } catch (error) {
    next(error);
  }
};
