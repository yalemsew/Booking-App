import { RequestHandler } from "express";
import { ErrorWithStatus, StandardResponse } from "../helpers/types";
import { Bike, BikeModel } from "./bike.model";
import { UserModel } from "../users/users.model";
import mongoose, { Mongoose, Types } from "mongoose";

export const getBikes: RequestHandler<
  unknown,
  StandardResponse<Bike[]>
> = async (req, res, next) => {
  try {
    const result = await BikeModel.find({});
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
// export const getBikeById: RequestHandler<
//   { bike_id: string },
//   StandardResponse
// > = async (req, res, next) => {
//   try {
//     const bike_id = req.params;
//     console.log(bike_id);
//     const objectId = new mongoose.Types.ObjectId({});
//     const result = await BikeModel.find({
//       _id: objectId,
//     });

//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     next(error);
//   }
// };

export const addBike: RequestHandler<
  unknown,
  StandardResponse<boolean>,
  Bike,
  unknown
> = async (req, res, next) => {
  try {
    const { _id: user_id, usertype } = req.token;
    if (usertype == "admin") {
      const new_bike = req.body;
      const isAlreadyExist = await BikeModel.findOne({
        plate_number: new_bike.plate_number,
      });
      if (isAlreadyExist) {
        throw new ErrorWithStatus("Bike already exists", 400);
      }
      const results = await BikeModel.create({
        ...new_bike,
      });
    } else {
      throw new ErrorWithStatus("Unauthorized", 401);
    }
    res.status(200).json({ success: true, data: true });
  } catch (error) {
    next(error);
  }
};

export const updateBike: RequestHandler<
  { bike_id: string },
  StandardResponse<number>,
  Bike,
  unknown
> = async (req, res, next) => {
  try {
    const { bike_id } = req.params;
    const bike = req.body;
    const { _id: user_id, usertype } = req.token;
    if (usertype == "admin") {
      const result = await BikeModel.updateOne(
        { _id: bike_id },
        { $set: { ...bike } }
      );
      res.status(200).json({ success: true, data: result.modifiedCount });
    } else {
      throw new ErrorWithStatus("Unauthorized", 401);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteBike: RequestHandler<
  { bike_id: string },
  StandardResponse<{ bike: number; booking: number }>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { bike_id } = req.params;
    const { _id: user_id, usertype } = req.token;
    if (usertype == "admin") {
      const result1 = await BikeModel.deleteOne({ _id: bike_id });
      const result2 = await UserModel.updateMany(
        {},
        { $pull: { bookings: { "bike._id": bike_id } } }
      );
      res.status(200).json({
        success: true,
        data: { bike: result1.deletedCount, booking: result2.modifiedCount },
      });
    } else {
      throw new ErrorWithStatus("Unauthorized", 401);
    }
  } catch (error) {
    next(error);
  }
};
