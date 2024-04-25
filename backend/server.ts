import express from "express";
import "dotenv/config";
import { db_connect } from "./helpers/db_connect";
import { errorHandler, noRouteHandler } from "./helpers/handlers";
import userRouter from "./users/users.router";
import { verifyToken } from "./users/users.middleware";
import bikeRouters from "./bike/bike.router";
import bookingRouters from "./booking/booking.router";
var cors = require("cors");

const app = express();

db_connect();

app.use(cors());
// app.use(morgan("dev")); //for log purpose

// routers
app.use("/user", userRouter);
app.use("/bike", bikeRouters);
app.use("/booking", verifyToken, bookingRouters);

app.all("*", noRouteHandler);
app.use(errorHandler);

app.listen(3000);
