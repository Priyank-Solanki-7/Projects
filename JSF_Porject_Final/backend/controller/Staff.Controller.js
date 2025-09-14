import db from "../db.js";

const ensureStaffTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS staff (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      age INT,
      gender VARCHAR(32),
      salary DECIMAL(10,2),
      role VARCHAR(128),
      image_url VARCHAR(1024),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(sql, (err) => {
    if (err) console.error("Failed to ensure staff table:", err);
    else console.log("staff table ready");
  });
};

ensureStaffTable();

export const createStaff = (req, res) => {
  const { name, email, age, gender, salary, role, image_url } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  const sql = `INSERT INTO staff (name,email,age,gender,salary,role,image_url) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [
      name,
      email,
      age || null,
      gender || null,
      salary || null,
      role || null,
      image_url || null,
    ],
    (err, result) => {
      if (err) {
        console.error("Insert staff error:", err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: "Database error" });
      }
      return res.status(201).json({ id: result.insertId });
    }
  );
};

export const listStaff = (req, res) => {
  db.query("SELECT * FROM staff ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

export const getStaff = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM staff WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!rows || rows.length === 0)
      return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  });
};

export const updateStaff = (req, res) => {
  const { id } = req.params;
  const { name, email, age, gender, salary, role, image_url } = req.body;
  const updates = [];
  const params = [];
  if (name !== undefined) {
    updates.push("name = ?");
    params.push(name);
  }
  if (email !== undefined) {
    updates.push("email = ?");
    params.push(email);
  }
  if (age !== undefined) {
    updates.push("age = ?");
    params.push(age || null);
  }
  if (gender !== undefined) {
    updates.push("gender = ?");
    params.push(gender);
  }
  if (salary !== undefined) {
    updates.push("salary = ?");
    params.push(salary || null);
  }
  if (role !== undefined) {
    updates.push("role = ?");
    params.push(role);
  }
  if (image_url !== undefined) {
    updates.push("image_url = ?");
    params.push(image_url);
  }

  if (updates.length === 0)
    return res.status(400).json({ error: "no update fields provided" });
  const sql = `UPDATE staff SET ${updates.join(", ")} WHERE id = ?`;
  params.push(id);
  db.query(sql, params, (err) => {
    if (err) {
      console.error("Update staff error:", err);
      if (err.code === "ER_DUP_ENTRY")
        return res.status(409).json({ error: "Email already exists" });
      return res.status(500).json({ error: "Database error" });
    }
    db.query("SELECT * FROM staff WHERE id = ?", [id], (err2, rows) => {
      if (err2) return res.status(500).json({ error: "Database error" });
      if (!rows || rows.length === 0)
        return res.status(404).json({ error: "Not found" });
      res.json(rows[0]);
    });
  });
};

export const deleteStaff = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM staff WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  });
};
