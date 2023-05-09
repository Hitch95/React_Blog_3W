import { createClassicConnexion } from "../db.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    // Checking of an existing user
    const query = "SELECT * FROM users WHERE email = ? OR username = ?";
    createClassicConnexion.query(query, [req.body.email, req.body.name], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("User already exists !");

        // Hashing of the password
        argon2.hash(req.body.password, function (err, hashedPassword) {
            if (err) return res.status(500).json(err);

            // Creation of the user
            const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            const values = [req.body.username, req.body.email, hashedPassword];

            createClassicConnexion.query(query, values, (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("User has been created");
            });
        });
    });
};



export const login = (req, res) => {
    // Check User

    const query = "SELECT * FROM users WHERE username = ?";

    createClassicConnexion.query(query, [req, body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found");

        // Check Password
        const isPasswordOk = argon2.verify(data[0].password, password);
        if (!isPasswordOk) return res.status(400).json("Wrong username or password");

        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        const { password, ...other } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200)
            .json(data[other]);
    });
};


export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.")
};
