import express, { Request, Response } from "express";

const itemRoute = express.Router();

itemRoute.post("/item", async (_req: Request, res: Response) => {
  return res.status(200).json({ message: "hello" });
});

export default itemRoute;
