import express from "express";

import { authRequired } from "../middlewares/authMiddleware.js";
import { getUsers } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/").get(authRequired, getUsers);

export default userRouter;
