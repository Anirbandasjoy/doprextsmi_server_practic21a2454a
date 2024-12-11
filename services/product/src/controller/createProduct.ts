import prisma from "@/config/prisma";
import { createError } from "@/helper/import";
import { errorResponse, successResponse } from "@/helper/response";
import { INVENTORY_SERVER_URL } from "@/secret/secret";
import { createProductValidator } from "@/validators/validator";
import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const handleCreateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const parseBody = createProductValidator.safeParse(req.body);
    if (!parseBody.success) {
      return errorResponse(res, {
        message: "Schema validation failed",
        payload: parseBody.error.errors,
      });
    }

    const existProduct = await prisma.product.findFirst({
      where: { sku: parseBody.data.sku },
    });
    if (existProduct) {
      return next(createError(409, "This SKU already exists"));
    }

    // Start transaction
    const result = await prisma.$transaction(async (prisma) => {
      const product = await prisma.product.create({
        data: parseBody.data,
      });

      console.log("Product created successfully", product.id);

      try {
        const { data: inventory } = await axios.post(
          `${INVENTORY_SERVER_URL}/inventory`,
          {
            productId: product.id,
            sku: product.sku,
          }
        );

        console.log("Inventory created successfully", inventory.payload.id);

        // Update product with inventoryId
        const updatedProduct = await prisma.product.update({
          where: { id: product.id },
          data: {
            inventoryId: inventory.payload.id,
          },
        });

        console.log(
          "Product updated successfully with inventoryId: " +
            inventory.payload.id
        );

        return { product: updatedProduct, inventory };
      } catch (inventoryError) {
        console.error(
          "Failed to create inventory, rolling back product creation",
          inventoryError
        );
        // Rollback the transaction by throwing an error
        throw createError(
          500,
          "Failed to create inventory. Product creation rolled back."
        );
      }
    });

    successResponse(res, {
      statusCode: 201,
      message: "Product created successfully",
      payload: { ...result.product, inventoryId: result.inventory.payload.id },
    });
  } catch (error) {
    next(error);
  }
};
