import db from "../db.js";

// ensure items table exists
const ensureItemsTable = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS items (
      iditem INT AUTO_INCREMENT PRIMARY KEY,
      itemName VARCHAR(255) NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
      url VARCHAR(1024),
      feedback TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(createTableSQL, (err) => {
    if (err) console.error("Failed to ensure items table:", err);
    else console.log("items table ready");
  });
};

ensureItemsTable();

// Ensure quantity column exists for upgrades where `items` table was created earlier
const ensureQuantityColumn = () => {
  db.query("SHOW COLUMNS FROM items LIKE 'quantity'", (err, results) => {
    if (err) {
      // Table may not exist yet or other error; nothing to do here
      return;
    }
    if (!results || results.length === 0) {
      db.query(
        "ALTER TABLE items ADD COLUMN quantity INT NOT NULL DEFAULT 0",
        (altErr) => {
          if (altErr) console.error("Failed to add quantity column:", altErr);
          else console.log("Added quantity column to items table");
        }
      );
    }
  });
};

ensureQuantityColumn();

export const addItem = async (req, res) => {
  try {
    const { itemName, cost, quantity, url, feedback } = req.body;
    if (!itemName || cost === undefined || cost === null) {
      return res.status(400).json({ error: "itemName and cost are required" });
    }
    const costNum = parseFloat(cost);
    if (Number.isNaN(costNum))
      return res.status(400).json({ error: "cost must be a number" });

    const qtyNum = Number.isNaN(parseInt(quantity, 10))
      ? 0
      : parseInt(quantity, 10);

    const sql = `INSERT INTO items (itemName, cost, quantity, url, feedback) VALUES (?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [itemName, costNum, qtyNum, url || null, feedback || null],
      (err, result) => {
        if (err) {
          console.error("AddItem insert error:", err);
          return res.status(500).json({ error: "Database error" });
        }
        return res
          .status(201)
          .json({ iditem: result.insertId, message: "Item added" });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getItems = async (req, res) => {
  db.query("SELECT * FROM items ORDER BY iditem DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

export const getItem = async (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM items WHERE iditem = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!results || results.length === 0)
      return res.status(404).json({ error: "Not found" });
    res.json(results[0]);
  });
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { itemName, cost, quantity, url, feedback } = req.body;
  const costNum = parseFloat(cost);
  const qtyNum = Number.isNaN(parseInt(quantity, 10))
    ? null
    : parseInt(quantity, 10);
  if (
    !itemName ||
    cost === undefined ||
    cost === null ||
    Number.isNaN(costNum) ||
    qtyNum === null
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }
  db.query(
    "UPDATE items SET itemName = ?, cost = ?, quantity = ?, url = ?, feedback = ? WHERE iditem = ?",
    [itemName, costNum, qtyNum, url || null, feedback || null, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Updated" });
    }
  );
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM items WHERE iditem = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "Deleted" });
  });
};
