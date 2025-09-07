import mysql from "mysql2";

const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER || "root";
const password = process.env.DB_PASS || "";
const database = process.env.DB_NAME || "restaurant_management";
const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

// Use a pool so closed single connections do not break the app
const pool = mysql.createPool({
  host,
  user,
  password,
  database,
  port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.on &&
  pool.on("error", (err) => {
    console.error("MySQL pool error:", err);
  });

export default pool;
