import express from "express";
import db from "./db.js";
import adduser from "./routes/AddUser.routes.js";
import loginuser from "./routes/Loginuser.routes.js";
import itemsRoutes from "./routes/items.routes.js";
import purchasesRoutes from "./routes/purchases.routes.js";
import tablesRoutes from "./routes/tables.routes.js";
import staffRoutes from "./routes/staff.routes.js";
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
app.use("/api/staff", staffRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
