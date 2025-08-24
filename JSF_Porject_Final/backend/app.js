import express from "express";
import db from "./db.js";
import adduser from "./routes/AddUserRoute.js";
import loginuser from "./routes/Loginuser.js";
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

db.connect((err) => {
  if (err) {
    console.log("database not connect", err);
  } else {
    console.log("database connected sucessfully");
  }
});

app.use("/register", adduser);
app.use("/login", loginuser);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
