import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import propertyRoutes from './routes/propertyRoute.js';
import userRouter from './routes/userRoute.js';



dotenv.config();
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

connectDB();

app.use('/uploads', express.static('uploads'));
app.use('/api/properties', propertyRoutes);
app.use('/api/user',userRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
