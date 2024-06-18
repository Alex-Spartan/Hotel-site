import express, { Router }from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

import authRouter from './router/auth.js';
//kbs9Fq4X4BIsJqqV
const app = express();
const port = 3000;
const router = Router();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

app.get('/test', (req, res) => {
    res.send('Hello, World!');
});

app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});