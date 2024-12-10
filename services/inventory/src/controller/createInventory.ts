import { Request, Response, NextFunction } from "express";

export const handleCreateInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
