import { Types } from "mongoose";
import { RequestHandler } from "express";
import { ErrorWithStatus, StandardResponse } from "../helpers/types";
import { Booking } from "./booking.model";
import { User, UserModel } from "../users/users.model";
import { Bike, BikeModel } from "../bike/bike.model";

export type BookingRequestType = {
  bike_id: string;
  bookingDate?: Date;
};

//getBooking
export const getBooking: RequestHandler<
  { user_id: string },
  StandardResponse<Booking[]>
> = async (req, res, next) => {
  try {
    const { _id: user_id, usertype } = req.token;
    const userObject: User | null = await UserModel.findOne({ _id: user_id });
    if (!userObject) {
      throw new ErrorWithStatus("User not found", 404);
    }
    res.status(200).json({ success: true, data: userObject!.bookings });
  } catch (error) {
    next(error);
  }
};
//addBooking
export const addBooking: RequestHandler<
  unknown,
  StandardResponse<number>,
  BookingRequestType,
  unknown
> = async (req, res, next) => {
  try {
    const { _id: user_id, usertype } = req.token;
    const bookToCreate = req.body;
    if (!bookToCreate) {
      throw new ErrorWithStatus("Booking data is required", 400);
    }

    const bikeObj: Bike | undefined | null = await BikeModel.findOne({
      _id: bookToCreate.bike_id,
    });
    if (!bikeObj || bikeObj?.status == "booked") {
      throw new ErrorWithStatus("Bike not found", 404);
    }

    const userObj = await UserModel.findOne({ _id: user_id });

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
      book_date: bookToCreate.bookingDate || new Date(),
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

//update booking
export const updateBooking: RequestHandler<
  { booking_id: string },
  StandardResponse<number>,
  BookingRequestType
> = async (req, res, next) => {
  try {
    const { booking_id } = req.params;
    const { bike_id, bookingDate } = req.body;
    const { _id: user_id } = req.token;

    const user = await UserModel.findOne({ _id: user_id });
    if (!user) throw new ErrorWithStatus("User not found", 404);

    const bike = await BikeModel.findOne({ _id: bike_id });
    console.log("bike is ", bike);
    if (!bike) throw new ErrorWithStatus("Bike not found", 404);

    const bookingIndex = user.bookings.findIndex(
      (existBook) => existBook._id?.toString() == booking_id
    );

    if (bookingIndex == -1) throw new ErrorWithStatus("Booking not found", 404);

    const booking = user.bookings[bookingIndex];
    const updatedBooking = {
      ...booking,
      bike: bike,
      book_date: bookingDate || booking.book_date,
      return_date: new Date(Date.now() + 86400000),
    };
    user.bookings[bookingIndex] = updatedBooking;
    const result = await UserModel.updateOne(
      { _id: user_id },
      { bookings: user.bookings }
    );
    res.status(200).json({ success: true, data: result.modifiedCount });
  } catch (error) {
    next(error);
  }
};
//deleteBooking
export const deleteBooking: RequestHandler<
  { booking_id: string },
  StandardResponse<number>
> = async (req, res, next) => {
  try {
    const { _id: user_id } = req.token;
    const { booking_id } = req.params;
    const result = await UserModel.updateOne(
      { _id: user_id },
      { $pull: { bookings: { _id: booking_id } } }
    );
    res.status(200).json({ success: true, data: result.modifiedCount });
  } catch (error) {
    next(error);
  }
};
