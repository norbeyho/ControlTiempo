import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import registroRoutes from "./routes/registroRoutes.js"

dotenv.config();
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Conexion a la base de datos
connectDB();

//Rutas
app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/registros", registroRoutes);


export default app;