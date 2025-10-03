// src/index.ts
import express, { Express, Request, Response } from "express";
import { randomUUID } from "node:crypto";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import signupRoute from "./routes/signup";
import loginRoute from "./routes/login";
import cors from "cors";
import env from "./env";
import authorizedRoutes from "./routes/auth";
import checkAdmin from "./routes/auth/checkAdmin";

const app: Express = express();
const port = process.env.PORT || 3000;

mongoose.connect(env.DB_URL).catch((e) => console.error(e));

app.all("/", async (req: Request, res: Response) => {
  return res.json({
    message: `server is running`,
  });
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const routes = [signupRoute, loginRoute, authorizedRoutes] as const;

// mount the routes
routes.forEach((route) => app.use("/api", route));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
