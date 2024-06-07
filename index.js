import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors';
dotenv.config()

connectDB();
const app = express();

//connect with DB

//middleware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
// app.get('/', (req,res) => {res.send({message:"heell"})});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Server running on ${PORT}`)})
