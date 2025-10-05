import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import signupRoute from "./routes/signup";
import loginRoute from "./routes/login";
import cors from "cors";
import env from "./env";
import authorizedRoutes from "./routes/auth";

const app: Express = express();
const port = process.env.PORT || 3000;

mongoose.connect(env.DB_URL).catch((e) => console.error(e));

app.all("/", async (req: Request, res: Response) => {
  return res.json({
    message: `server is running`,
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const routes = [signupRoute, loginRoute, authorizedRoutes] as const;

routes.forEach((route) => app.use("/api", route));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
