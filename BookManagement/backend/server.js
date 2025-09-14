import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import booksRoutes from "./routes/books.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import combosRoutes from "./routes/combos.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/combos", combosRoutes);

const start = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI not set in .env");
    await mongoose.connect(uri, { dbName: "BookManagement" });
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
