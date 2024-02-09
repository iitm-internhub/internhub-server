import { Request, Response } from "express";
import User from "../model/user.model";
import { handleError } from "../error/handleError";

const getAllUsers = async (req: Request | any, res: Response) => {
  try {
    const isAdmin = req.user;

    if (Object.keys(isAdmin).length === 0) {
      return res.status(401).json({
        success: false,
        message: "sorry you don't have admin access",
      });
    }

    const allUsers = await User.find({});
    return res.status(200).json({
      success: true,
      users: allUsers,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export { getAllUsers };
