import { Request, Response } from "express";
import { handleError } from "../error/handleError";
import User, { UserSchemaInterface } from "../model/user.model";
import generateToken from "../utils/generateToken";
import bcrypt from "bcrypt";

const Signup = async (req: Request, res: Response) => {
  try {
    const { username, password, email, phone_number } = req.body;

    if (!username || !password || !email || !phone_number) {
      return res.status(400).json({
        success: false,
        message:
          "username, email, phone_number and password field cannot be empty",
      });
    }

    // check if the user already exists or not ?
    const isUserAlreadyExists = await User.find({ email: email });
    if (Object.keys(isUserAlreadyExists).length !== 0) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    // create hashed password
    const saltRounds: number = Number(process.env.SALT_ROUNDS) | 10;
    bcrypt.hash(
      password,
      saltRounds,
      async (err: Error | undefined, hash: string) => {
        if (err) {
          handleError(err, res);
        }

        // otherwise create user
        const newUser = new User({
          username: username,
          password: hash,
          email: email,
          phone_number: phone_number,
        });

        const user = await newUser.save();
        const userAuthToken: string | unknown = await generateToken(
          user._id,
          res
        );

        if (user) {
          return res.status(201).json({
            success: true,
            message: "user registered successfully",
            user: user,
            authToken: userAuthToken,
          });
        }

        return res.status(400).json({
          success: false,
          message: "user not registered",
        });
      }
    );
  } catch (err) {
    handleError(err, res);
  }
};

const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password field cannot be empty",
      });
    }

    const isUserExists: UserSchemaInterface | null = await User.findOne({
      email: email,
    });

    if (isUserExists === null || Object.keys(isUserExists).length === 0) {
      return res.status(400).json({
        success: false,
        message: "no user exists with the provided email",
      });
    }

    bcrypt.compare(
      password,
      isUserExists?.password,
      async (err: Error | undefined, result: boolean) => {
        if (err) {
          handleError(err, res);
        }

        if (result === true) {
          const authToken = await generateToken(isUserExists?._id, res);

          return res.status(200).json({
            success: true,
            message: "user logged in successfully",
            authToken: authToken,
          });
        } else {
          return res
            .status(401)
            .json({ success: false, message: "unauthorized: wrong password" });
        }
      }
    );
  } catch (err) {
    handleError(err, res);
  }
};

export { Signup, Login };
