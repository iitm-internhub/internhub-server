var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../model/user.model.js";
import { handleError } from "../error/handleError.js";
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAdmin = req.user;
        if (Object.keys(isAdmin).length === 0) {
            return res.status(401).json({
                success: false,
                message: "sorry you don't have admin access",
            });
        }
        const allUsers = yield User.find({});
        return res.status(200).json({
            success: true,
            users: allUsers,
        });
    }
    catch (err) {
        handleError(err, res);
    }
});
export { getAllUsers };
