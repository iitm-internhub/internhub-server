var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MONGODB_URI = process.env.MONGODB_ATLAS_URI || "";
        const connection = yield mongoose.connect(MONGODB_URI, {
            dbName: "internHub",
            bufferCommands: false,
        });
        console.log("Database Connected: ", connection.connection.host);
    }
    catch (err) {
        console.log("something went wrong while connecting to database");
        console.log(err);
    }
});
export default connectDatabase;
