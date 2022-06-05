import express from "express";

import { signIn, signUp } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.route("/sign-in").post(signIn);
authRouter.route("/sign-up").post(signUp);

export default authRouter;
