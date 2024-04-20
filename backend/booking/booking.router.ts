import { json } from "body-parser";
import express from "express";
import { addBooking, deleteBooking, getBooking } from "./booking.handlers";

const bookingRouters = express.Router();

bookingRouters.get("/", getBooking);
bookingRouters.post("/", json(), addBooking);
bookingRouters.delete("/:booking_id", deleteBooking);

export default bookingRouters;
