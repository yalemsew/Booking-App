import { json } from "body-parser";
import express from "express";
import { addBike, deleteBike, getBikes } from "./bike.handlers";
import { verifyToken } from "../users/users.middleware";

const bikeRouters = express.Router();

bikeRouters.get("/", getBikes);
bikeRouters.post("/", json(), verifyToken, addBike);
bikeRouters.delete("/:bike_id", verifyToken, deleteBike);

export default bikeRouters;
