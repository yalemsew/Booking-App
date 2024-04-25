import express, { json } from "express";
import { getUser, signin_handler, signup_handler } from "./users.handlers";
import { verifyToken } from "./users.middleware";

const userRouter = express.Router();

userRouter.post("/signin", json(), signin_handler);
userRouter.post("/signup", json(), signup_handler);
userRouter.get("/users", verifyToken, json(), getUser);

export default userRouter;
