import { Request, Response } from "express";
import { handleError } from "../error/handleError";
import User from "../model/user.model";
import { generateAdminToken } from "../utils/generateToken";

const Login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const admin = await User.findOne({ username: username });

    if (admin === null || Object.keys(admin).length === 0) {
      return res.status(404).json({
        success: false,
        message: "no admin found with provided username",
      });
    }

    const isAuthenticated = admin.password === password;
    if (isAuthenticated) {
      const token = await generateAdminToken(admin._id, res);

      return res.status(200).json({
        success: true,
        message: `logged in as ${admin.username}`,
        authToken: token,
      });
    }

    return res.status(401).json({
      success: false,
      message: "unauthorized: wrong credentials",
    });
  } catch (err) {
    handleError(err, res);
  }
};

export { Login };
