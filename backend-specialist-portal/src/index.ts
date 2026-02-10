import express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source.js";
import specialistRoutes from "./routes/specialistRoutes.js"; 

dotenv.config();

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/specialists", specialistRoutes);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully!");
        
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error", error);
    });