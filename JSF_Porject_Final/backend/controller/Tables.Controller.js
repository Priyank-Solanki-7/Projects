import db from "../db.js";

const ensureTablesTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS restaurant_tables (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      seats INT NOT NULL DEFAULT 4,
      status VARCHAR(32) NOT NULL DEFAULT 'available',
      note VARCHAR(255),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(sql, (err) => {
    if (err) console.error("Failed to ensure restaurant_tables:", err);
    else console.log("restaurant_tables ready");
  });
};

ensureTablesTable();

export const listTables = (req, res) => {
  db.query("SELECT * FROM restaurant_tables ORDER BY id", (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
};

export const createTable = (req, res) => {
  const { name, seats, status, note } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });
  const seatsNum = parseInt(seats, 10) || 4;
  const s = status || "available";
  db.query(
    "INSERT INTO restaurant_tables (name, seats, status, note) VALUES (?, ?, ?, ?)",
    [name, seatsNum, s, note || null],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res
        .status(201)
        .json({ id: result.insertId, name, seats: seatsNum, status: s, note });
    }
  );
};

export const updateTable = (req, res) => {
  const { id } = req.params;
  const { name, seats, status, note } = req.body;
  const updates = [];
  const params = [];
  if (name !== undefined) {
    updates.push("name = ?");
    params.push(name);
  }
  if (seats !== undefined) {
    updates.push("seats = ?");
    params.push(parseInt(seats, 10) || 0);
  }
  if (status !== undefined) {
    updates.push("status = ?");
    params.push(status);
  }
  if (note !== undefined) {
    updates.push("note = ?");
    params.push(note);
  }
  if (updates.length === 0) return res.status(400).json({ error: "no fields" });
  params.push(id);
  db.query(
    `UPDATE restaurant_tables SET ${updates.join(", ")} WHERE id = ?`,
    params,
    (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      db.query(
        "SELECT * FROM restaurant_tables WHERE id = ?",
        [id],
        (err2, rows) => {
          if (err2) return res.status(500).json({ error: "Database error" });
          res.json(rows[0]);
        }
      );
    }
  );
};

export const deleteTable = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM restaurant_tables WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "deleted" });
  });
};
