import { config } from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import connectDatabase from "./db/connectDatabase.js";

import AuthenticationHandler from "./route/authentication.route.js";
import AdminAuthHandler from "./admin-route/admin.auth.route.js";
import AdminInfoHandler from "./admin-route/admin.info.route.js";

config();

const PORT: number = Number(process.env.PORT) || 9090;
const app: Express = express();

app.listen(PORT, () => {
  console.log(`now listening on PORT: ${PORT}`);
});

const corsOptions = {
  AccessControlAllowOrigin: "*",
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// middlewares
app.use(express.json());
app.use(cors(corsOptions));

// user server routes
app.use("/api/v1/auth", AuthenticationHandler);

// admin server routes
app.use("/api/v1/auth-admin", AdminAuthHandler);
app.use("/api/v1/info-admin", AdminInfoHandler);

connectDatabase();

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running");
});
