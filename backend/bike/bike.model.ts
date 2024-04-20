import mongoose, { Schema, model, InferSchemaType } from 'mongoose';

export const bikeSchema = new Schema({
    plate_number: { type: String, required: true },
    color: { type: String, required: false },
    status: { type: String, enum: ['available','booked'], default: 'available' },
});
export type Bike = InferSchemaType<typeof bikeSchema>;

