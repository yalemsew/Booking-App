import express from 'express';
// import morgan from 'morgan';
import 'dotenv/config';
import { db_connect } from './helpers/db_connect';
import { errorHandler, noRouteHandler } from './helpers/handlers';
import userRouter from './users/users.router';
// import bikeRouter from './bike/bike.router';
// import bookingRouter from  './booking/booking.router'; 
import { verifyToken } from './users/users.middleware';

const app =express();

db_connect();

// app.use(morgan('dev')); //for log purpose

// routers
app.use('/users', userRouter);
// app.use('/bike', verifyToken, bikeRouter);
// app.use('/booking', verifyToken, bookingRouter);

app.all('*', noRouteHandler);
app.use(errorHandler);

app.listen(3000);

