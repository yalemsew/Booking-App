import { json } from "body-parser";
import express from "express";
import { addBike, deleteBike, getBikes, updateBike } from "./bike.handlers";
import { verifyToken } from "../users/users.middleware";

const bikeRouters = express.Router();

bikeRouters.get("/", getBikes);
// bikeRouters.get("/:bike_id", getBikeById);
bikeRouters.post("/", json(), verifyToken, addBike);
bikeRouters.put("/:bike_id", json(), verifyToken, updateBike);
bikeRouters.delete("/:bike_id", json(), verifyToken, deleteBike);

export default bikeRouters;
