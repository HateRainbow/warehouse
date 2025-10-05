import { Request, Response, Router } from "express";
import { getUserId } from "../../util/get-user-id";
import UserModel from "../../model/user";

const userDataRoute = Router();

userDataRoute.get("/user-info", async (req: Request, res: Response) => {
  const id = getUserId(req);

  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  return res.status(200).json({
    message: "user info fetched",
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.role === "ADMIN",
    },
  });
});

export default userDataRoute;
