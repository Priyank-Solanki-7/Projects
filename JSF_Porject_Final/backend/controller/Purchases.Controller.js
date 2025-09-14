import db from "../db.js";

// Ensure purchases table contains fields for status, collected and estimated time
const ensurePurchasesTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS purchases (
      id INT AUTO_INCREMENT PRIMARY KEY,
      itemId INT,
      itemName VARCHAR(255) NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      total DECIMAL(10,2) NOT NULL,
      purchaserName VARCHAR(255),
      purchaserEmail VARCHAR(255),
      status VARCHAR(32) NOT NULL DEFAULT 'pending',
      collected TINYINT(1) NOT NULL DEFAULT 0,
      estimated_minutes INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (itemId) REFERENCES items(iditem) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(sql, (err) => {
    if (err) console.error("Failed to ensure purchases table:", err);
    else console.log("purchases table ready");
  });
};

ensurePurchasesTable();

export const createPurchase = (req, res) => {
  const { itemId, quantity, purchaserName, purchaserEmail } = req.body;
  if (!itemId || !quantity) {
    return res.status(400).json({ error: "itemId and quantity are required" });
  }
  const qty = parseInt(quantity, 10);
  if (Number.isNaN(qty) || qty <= 0)
    return res
      .status(400)
      .json({ error: "quantity must be a positive integer" });

  // Fetch item price, name and stock
  db.query(
    "SELECT iditem, itemName, cost, quantity FROM items WHERE iditem = ? FOR UPDATE",
    [itemId],
    (err, items) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (!items || items.length === 0)
        return res.status(404).json({ error: "Item not found" });
      const item = items[0];
      const stock = Number(item.quantity || 0);
      if (stock < qty)
        return res.status(400).json({ error: "Insufficient stock" });
      const total = Number(item.cost) * qty;

      // decrement stock
      db.query(
        "UPDATE items SET quantity = quantity - ? WHERE iditem = ? AND quantity >= ?",
        [qty, itemId, qty],
        (updErr, updRes) => {
          if (updErr) {
            console.error("Stock update error:", updErr);
            return res.status(500).json({ error: "Database error" });
          }
          if (updRes.affectedRows === 0) {
            return res.status(400).json({ error: "Insufficient stock" });
          }

          const insertSql = `INSERT INTO purchases (itemId, itemName, quantity, total, purchaserName, purchaserEmail) VALUES (?, ?, ?, ?, ?, ?)`;
          db.query(
            insertSql,
            [
              itemId,
              item.itemName,
              qty,
              total,
              purchaserName || null,
              purchaserEmail || null,
            ],
            (insErr, result) => {
              if (insErr) {
                console.error("Insert purchase error:", insErr);
                return res.status(500).json({ error: "Database error" });
              }
              return res.status(201).json({
                id: result.insertId,
                itemId,
                itemName: item.itemName,
                quantity: qty,
                total,
              });
            }
          );
        }
      );
    }
  );
};

export const listPurchases = (req, res) => {
  db.query("SELECT * FROM purchases ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

export const getPurchase = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM purchases WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!rows || rows.length === 0)
      return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  });
};

export const updatePurchase = (req, res) => {
  const { id } = req.params;
  const { status, collected, estimated_minutes } = req.body;

  const allowedStatuses = [
    "pending",
    "preparing",
    "ready",
    "delivered",
    "cancelled",
  ];
  const updates = [];
  const params = [];

  if (status !== undefined) {
    if (!allowedStatuses.includes(status))
      return res
        .status(400)
        .json({ error: `status must be one of ${allowedStatuses.join(",")}` });
    updates.push("status = ?");
    params.push(status);
  }
  if (collected !== undefined) {
    // Accept boolean or number
    updates.push("collected = ?");
    params.push(collected ? 1 : 0);
  }
  if (estimated_minutes !== undefined) {
    const val = parseInt(estimated_minutes, 10);
    if (Number.isNaN(val) && estimated_minutes !== null)
      return res
        .status(400)
        .json({ error: "estimated_minutes must be integer or null" });
    updates.push("estimated_minutes = ?");
    params.push(Number.isNaN(val) ? null : val);
  }

  if (updates.length === 0)
    return res.status(400).json({ error: "no update fields provided" });

  const sql = `UPDATE purchases SET ${updates.join(", ")} WHERE id = ?`;
  params.push(id);
  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ error: "Database error" });
    db.query("SELECT * FROM purchases WHERE id = ?", [id], (err2, rows) => {
      if (err2) return res.status(500).json({ error: "Database error" });
      if (!rows || rows.length === 0)
        return res.status(404).json({ error: "Not found" });
      res.json(rows[0]);
    });
  });
};
