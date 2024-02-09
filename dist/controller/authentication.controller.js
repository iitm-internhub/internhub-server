var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { handleError } from "../error/handleError.js";
import User from "../model/user.model.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email, phone_number } = req.body;
        if (!username || !password || !email || !phone_number) {
            return res.status(400).json({
                success: false,
                message: "username, email, phone_number and password field cannot be empty",
            });
        }
        // check if the user already exists or not ?
        const isUserAlreadyExists = yield User.find({ email: email });
        if (Object.keys(isUserAlreadyExists).length !== 0) {
            return res.status(400).json({
                success: false,
                message: "user already exists",
            });
        }
        // create hashed password
        const saltRounds = Number(process.env.SALT_ROUNDS) | 10;
        bcrypt.hash(password, saltRounds, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
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
            const user = yield newUser.save();
            const userAuthToken = yield generateToken(user._id, res);
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
        }));
    }
    catch (err) {
        handleError(err, res);
    }
});
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email and password field cannot be empty",
            });
        }
        const isUserExists = yield User.findOne({
            email: email,
        });
        if (isUserExists === null || Object.keys(isUserExists).length === 0) {
            return res.status(400).json({
                success: false,
                message: "no user exists with the provided email",
            });
        }
        bcrypt.compare(password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                handleError(err, res);
            }
            if (result === true) {
                const authToken = yield generateToken(isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id, res);
                return res.status(200).json({
                    success: true,
                    message: "user logged in successfully",
                    authToken: authToken,
                });
            }
            else {
                return res
                    .status(401)
                    .json({ success: false, message: "unauthorized: wrong password" });
            }
        }));
    }
    catch (err) {
        handleError(err, res);
    }
});
export { Signup, Login };
