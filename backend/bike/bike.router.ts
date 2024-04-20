import { json } from "body-parser";
import express from "express";
import { addBike, deleteBike, getBikes } from "./bike.handlers";

const bikeRouters = express.Router();

bikeRouters.get("/", getBikes);
bikeRouters.post("/", json(), addBike);
bikeRouters.delete("/:bike_id", deleteBike);

export default bikeRouters;
