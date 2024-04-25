import "dotenv/config";
import { RequestHandler } from "express";
import { ErrorWithStatus, StandardResponse } from "../helpers/types";
import { User, UserModel } from "./users.model";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export const signin_handler: RequestHandler<
  unknown,
  StandardResponse<string>,
  { email: string; password: string },
  unknown
> = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) throw new ErrorWithStatus("User not found", 401);

    const match = await compare(password, user.password);
    if (!match) throw new ErrorWithStatus("Wrong password", 401);

    if (!process.env.PRIVATE_KEY)
      throw new ErrorWithStatus("No Private Key", 401);

    const jwt = sign(
      {
        _id: user._id,
        fullname: user.fullname,
        usertype: user.usertype,
        email: user.email,
      },
      process.env.PRIVATE_KEY as string
    );

    res.status(200).json({ success: true, data: jwt });
  } catch (error) {
    next(error);
  }
};
export const getUser: RequestHandler<
  unknown,
  StandardResponse<User[]>
> = async (req, res, next) => {
  try {
    const { usertype } = req.token;
    const result: User[] = [];
    if (usertype == "admin") {
      const result: User[] = await UserModel.find({});
      res.status(200).json({ success: true, data: result });
    }
    throw new ErrorWithStatus("Not Authorized", 400);
  } catch (error) {
    next(error);
  }
};

export const signup_handler: RequestHandler<
  unknown,
  StandardResponse<boolean>,
  User
> = async (req, res, next) => {
  try {
    const new_user = req.body;
    const hashed_password = await hash(new_user.password, 10);
    const results = await UserModel.create({
      ...new_user,
      password: hashed_password,
    });
    res.status(200).json({ success: true, data: true });
  } catch (error) {
    next(error);
  }
};
