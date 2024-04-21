import { json } from "body-parser";
import express from "express";
import {
  addBooking,
  deleteBooking,
  getBooking,
  updateBooking,
} from "./booking.handlers";

const bookingRouters = express.Router();

bookingRouters.get("/", getBooking);
bookingRouters.post("/", json(), addBooking);
bookingRouters.put("/:booking_id", json(), updateBooking);
bookingRouters.delete("/:booking_id", deleteBooking);

export default bookingRouters;
