import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";

import mysql from "mysql2";

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

app.get("/users", (req, res) => {
    const q = "SELECT * FROM users"
    db.query(q,(err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})
;
app.listen(8800, () => {
    console.log("Connected to backend");
});