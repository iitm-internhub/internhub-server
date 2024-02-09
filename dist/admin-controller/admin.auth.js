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
import { generateAdminToken } from "../utils/generateToken.js";
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const admin = yield User.findOne({ username: username });
        if (admin === null || Object.keys(admin).length === 0) {
            return res.status(404).json({
                success: false,
                message: "no admin found with provided username",
            });
        }
        const isAuthenticated = admin.password === password;
        if (isAuthenticated) {
            const token = yield generateAdminToken(admin._id, res);
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
    }
    catch (err) {
        handleError(err, res);
    }
});
export { Login };
