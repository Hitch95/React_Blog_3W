import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const options = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

export function createClassicConnexion() {
    return mysql.createConnection(options);
};

let pool = null;

export function getPoolConnexion() {
    if (pool) {
        return pool;
    }

    pool = mysql.createPool(options);

    return pool;
};
