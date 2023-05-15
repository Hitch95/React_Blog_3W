import { createClassicConnexion } from "../db.js";
import baseRepository from "../repository/baseRepository.js";
import userRepository from "../repository/userRepository.js";

import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { randomBytes } from "crypto";

dotenv.config();
const JWT_SECRET = randomBytes(64).toString("hex");


export const register = async (req, res) => {
    try {
        const email = req.body.email;
        const username = req.body.username;

        // Check if a user with the same email already exists
        const userByEmail = await userRepository.findOneByEmail(email);
        if (userByEmail) {
            return res.status(409).json("L'utilisateur existe déjà !");
        }

        // Check if a user with the same username already exists
        const userByUsername = await userRepository.findOneByUsername(username);
        if (userByUsername) {
            return res.status(409).json("Le nom d'utilisateur est déjà pris !");
        }

        // Hash the password
        const hashedPassword = await argon2.hash(req.body.password);

        // Create a new user with the hashed password
        await baseRepository.insert("users", { username, email, password: hashedPassword });

        return res.status(200).json("L'utilisateur a été créé");
    } catch (error) {
        console.error(error);
        return res.status(500).json(error.message);
    }
};



export const login = async (req, res) => {
    try {
        // Check if the user exists
        const user = await userRepository.findOneByUsername(req.body.username);
        if (!user) {
            return res.status(404).json("Utilisateur non trouvé");
        }

        // Check the password
        const isPasswordOk = await argon2.verify(user.password, req.body.password);
        if (!isPasswordOk) {
            return res.status(400).json("Nom d'utilisateur ou mot de passe incorrect");
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: "1h",
        });

        // Return the user without the password and the access token in an HttpOnly cookie
        const { password, ...other } = user;

        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ token, ...other });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};




export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.")
};
