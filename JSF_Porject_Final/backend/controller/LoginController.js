import db from "../db.js";
import bcrypt from "bcryptjs";

export const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const Q =
    "SELECT id, fullName, email, password FROM register WHERE email = ?";
  db.query(Q, [email], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });
    const user = result[0];
    const matches = bcrypt.compareSync(password, user.password);
    if (!matches)
      return res.status(401).json({ message: "Invalid credentials" });
    return res
      .status(200)
      .json({
        message: "Login successful",
        user: { id: user.id, fullName: user.fullName, email: user.email },
      });
  });
};
