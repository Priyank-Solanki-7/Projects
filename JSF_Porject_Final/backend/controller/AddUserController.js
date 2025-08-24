import db from "../db.js";
import bcrypt from "bcryptjs";

export const ragister = (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ message: "fullName, email and password are required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Check if email already exists
  const checkQ = "SELECT id FROM register WHERE email = ?";
  db.query(checkQ, [email], (checkErr, checkRes) => {
    if (checkErr) {
      console.error("DB error:", checkErr);
      return res.status(500).json({ message: "Database error" });
    }
    if (checkRes.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);

    const Q = "INSERT INTO register(fullName,email,password) VALUES (?,?,?)";
    db.query(Q, [fullName, email, hashed], (err, result) => {
      if (err) {
        console.error("DB insert error:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({ message: "Registered" });
    });
  });
};
