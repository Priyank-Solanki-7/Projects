import express from "express";
import db from "./db.js";
import adduser from "./routes/AddUserRoute.js";
import loginuser from "./routes/Loginuser.js";
import itemsRoutes from "./routes/items.js";
import purchasesRoutes from "./routes/purchases.js";
import tablesRoutes from "./routes/tables.js";
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

// db is a pool; verify connectivity with a test query instead of db.connect
db.query("SELECT 1", (err) => {
  if (err) {
    console.error("Database test query failed:", err);
  } else {
    console.log("database pool is available");
  }
});

app.use("/register", adduser);
app.use("/login", loginuser);
app.use("/api/items", itemsRoutes);
app.use("/api/purchases", purchasesRoutes);
app.use("/api/tables", tablesRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
