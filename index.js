import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

dotenv.config()

const app = express();

//connect with DB
connectDB();

//middleware
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req,res) => {res.send({message:""})});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Server running on ${PORT}`)})
