import mongoose, { Schema, model, InferSchemaType } from "mongoose";
import { bikeSchema } from "../bike/bike.model";

export const bookingSchema = new Schema({
  bike: { type: bikeSchema, required: true },
  book_date: { type: Date, default: () => Date.now() },
  return_date: { type: Date, default: () => Date.now() + 1000 * 60 * 60 * 24 },
});
export type Booking = InferSchemaType<typeof bookingSchema>;
