import prisma from "@/config/prisma";
import { createError } from "@/helper/import";
import { successResponse } from "@/helper/response";
import { Request, Response, NextFunction } from "express";

export const handleFindInventories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;

  const skip = (pageNumber - 1) * limitNumber;

  const totalInventories = await prisma.inventory.count();

  const inventories = await prisma.inventory.findMany({
    skip,
    take: limitNumber,
    orderBy: { createdAt: "desc" },
  });

  if (!inventories || inventories.length === 0) {
    return next(createError(404, "Inventory not found."));
  }
  successResponse(res, {
    message: "Returned inventories",
    payload: {
      data: inventories,
      pagination: {
        count: totalInventories,
        totalPages: Math.ceil(totalInventories / limitNumber),
        currentPage: pageNumber,
        pageSize: limitNumber,
        prevPage: pageNumber > 1 ? pageNumber - 1 : null,
        nextPage:
          pageNumber < Math.ceil(totalInventories / limitNumber)
            ? pageNumber + 1
            : null,
      },
    },
  });
  try {
  } catch (error) {
    next(error);
  }
};
