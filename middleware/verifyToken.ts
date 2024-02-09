import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/user.model";

const protect_admin = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "";
      const decoded_admin: any = jwt.verify(token, JWT_SECRET_KEY);

      req.user = await User.findById(decoded_admin._id);

      next();
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "unauthorized: invalid token",
      });
    }
  }
};

export default protect_admin;
