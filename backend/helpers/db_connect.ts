import mongoose from "mongoose";
import 'dotenv/config';
import { config } from "dotenv";

config();

export function db_connect() {
    console.log(process.env.MONGODB_URL);
    if (process.env.MONGODB_URL) {
        mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log('DB connected'))
        .catch(console.log);
    } else {
        console.log('DB_URL does not exist');
    }
}