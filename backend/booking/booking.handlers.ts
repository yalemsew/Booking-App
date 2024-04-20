import { Types } from "mongoose";
import { RequestHandler } from "express";
import { StandardResponse } from "../helpers/types";
import { Booking } from "./booking.model";
import { UserModel } from "../users/users.model";

//getBooking
export const getBooking: RequestHandler<
  { user_id: string },
  StandardResponse<string>
> = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const result = await UserModel.findOne({ _id: user_id }, { booking: 1 });
    res.status(200).json({ success: true, data: "fetched" });
  } catch (error) {
    next(error);
  }
};
//addBooking
export const addBooking: RequestHandler<
  unknown,
  StandardResponse<number>,
  Booking,
  unknown
> = async (req, res, next) => {
  try {
    const booking = req.body;
    const { _id: user_id, usertype } = req.token;
    const result = await UserModel.updateOne(
      { _id: user_id },
      { $push: { booking: booking } }
    );
    res.status(200).json({ success: true, data: result.modifiedCount });
  } catch (error) {}
};
//deleteBooking
export const deleteBooking: RequestHandler<
  { user_id: string; booking_id: string },
  StandardResponse<number>
> = async (req, res, next) => {
  try {
    const { user_id, booking_id } = req.params;
    const result = await UserModel.updateOne(
      { _id: user_id },
      { $pull: { booking: { _id: booking_id } } }
    );
    res.status(200).json({ success: true, data: result.modifiedCount });
  } catch (error) {
    next(error);
  }
};
