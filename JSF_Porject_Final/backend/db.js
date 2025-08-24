import express from "express";
import sql from "mysql2";
const app = express();
const db = sql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"restaurant_management",
    port:"3307"
});
export default db;