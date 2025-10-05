import { Request, Response, Router } from "express";
import { validateData } from "../../middleware/validationMiddleware";
import z from "zod";
import { getUserId } from "../../util/get-user-id";
import UserModel from "../../model/user";
import bcrypt from "bcrypt";
const userRouter = Router();

const changeUser = z.object({
  email: z.email(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  password: z.string().nonempty(),
});

type ChangeUserRequest = z.infer<typeof changeUser>;
userRouter.put(
  "/change-user",
  validateData(changeUser),
  async (req: Request<{}, {}, ChangeUserRequest>, res: Response) => {
    const id = getUserId(req);

    const { email, firstName, lastName, password } = req.body;

    await UserModel.findByIdAndUpdate(id, {
      email,
      firstName,
      lastName,
      hashedPassword: await bcrypt.hash(password, 10),
    });

    res.status(200).json({ message: "User changed successfully" });
  }
);

export default userRouter;
