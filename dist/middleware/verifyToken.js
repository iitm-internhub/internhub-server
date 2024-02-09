var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
const protect_admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
            const decoded_admin = jwt.verify(token, JWT_SECRET_KEY);
            req.user = yield User.findById(decoded_admin._id);
            next();
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "unauthorized: invalid token",
            });
        }
    }
});
export default protect_admin;
