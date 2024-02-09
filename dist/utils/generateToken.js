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
import { handleError } from "../error/handleError.js";
const generateToken = (_id, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
        const token = yield jwt.sign({ _id: _id }, JWT_SECRET_KEY, {
            expiresIn: "30D",
        });
        return token;
    }
    catch (err) {
        console.log("error while generating token");
        handleError(err, res);
    }
});
const generateAdminToken = (_id, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
        const token = yield jwt.sign({ _id: _id }, JWT_SECRET_KEY, {
            expiresIn: "2H",
        });
        return token;
    }
    catch (err) {
        console.log("error while generating token");
        handleError(err, res);
    }
});
export default generateToken;
export { generateAdminToken };
