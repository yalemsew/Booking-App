import { Types } from "mongoose";
import { RequestHandler } from "express";
import { ErrorWithStatus, StandardResponse } from "../helpers/types";
import { Bike, BikeModel } from "./bike.model";

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

export const deleteBike: RequestHandler<
  { bike_id: string },
  StandardResponse<number>
> = async (req, res, next) => {
  try {
    const { bike_id } = req.params;
    const { _id: user_id, usertype } = req.token;
    if (usertype == "admin") {
      const result = await BikeModel.deleteOne({ _id: bike_id });
      res.status(200).json({ success: true, data: result.deletedCount });
    } else {
      throw new ErrorWithStatus("Unauthorized", 401);
    }
  } catch (error) {
    next(error);
  }
};
