import mongoose, { Schema, model, InferSchemaType } from 'mongoose';
import { bookingSchema } from '../booking/booking.model';

export const userSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    usertype: { type: String, enum: ['admin', 'user'], default: 'user' },
    location: { type: [Number], index: '2d', required: false },
    booking: [bookingSchema],
}, { versionKey: false })
export type User = InferSchemaType<typeof userSchema> & { _id: Schema.Types.ObjectId };

export const UserModel = model<User>('user', userSchema);