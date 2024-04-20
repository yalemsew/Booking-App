import { Types } from "mongoose";
import { RequestHandler } from "express";
import { ErrorWithStatus, StandardResponse } from "../helpers/types";
import { Booking } from "./booking.model";
import { UserModel } from "../users/users.model";
import { BikeModel } from "../bike/bike.model";

export interface CreateBooking {
  bike_id: string;
  date: Date;
}

//getBooking
export const getBooking: RequestHandler<
  { user_id: string },
  StandardResponse<Booking>
> = async (req, res, next) => {
  try {
    const { _id: user_id, usertype } = req.token;
    const userObject = await UserModel.findOne({ _id: user_id }, {});
    res.status(200).json({ success: true, data: userObject?.bookings });
  } catch (error) {
    next(error);
  }
};
//addBooking
export const addBooking: RequestHandler<
  unknown,
  StandardResponse<number>,
  CreateBooking,
  unknown
> = async (req, res, next) => {
  try {
    const { _id: user_id, usertype } = req.token;
    const bookToCreate = req.body;

    const bikeObj = await BikeModel.findOne({ _id: bookToCreate.bike_id }, {});
    if (!bikeObj && bikeObj?.status == "booked") {
      throw new ErrorWithStatus("Bike not found", 404);
    }

    const userObj = await UserModel.findOne({ _id: user_id }, {});

    if (userObj?.bookings) {
      const userBookings = userObj.bookings;
      const isBooked = userBookings.some((userBooking: any) => {
        return userBooking.bike._id == bookToCreate.bike_id;
      });
      if (isBooked) {
        throw new ErrorWithStatus("Bike already booked", 400);
      }
    }

    const newBooking: Booking = {
      bike: bikeObj,
      book_date: bookToCreate.date,
      return_date: new Date(Date.now() + 86400000),
    };
    const result = await UserModel.updateOne(
      { _id: user_id },
      { $push: { bookings: newBooking } }
    );

    // update bike availablilty
    await BikeModel.updateOne(
      { _id: bookToCreate.bike_id },
      { $set: { status: "booked" } }
    );

    res.status(200).json({ success: true, data: result.modifiedCount });
  } catch (error) {
    next(error);
  }
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
      { $pull: { bookings: { _id: booking_id } } }
    );
    res.status(200).json({ success: true, data: result.modifiedCount });
  } catch (error) {
    next(error);
  }
};
