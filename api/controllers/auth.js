import { createClassicConnexion } from "../db.js";
import baseRepository from "../repository/baseRepository.js";
import userRepository from "../repository/userRepository.js";

import argon2 from "argon2";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const email = req.body.email;
        const username = req.body.username;

        // Vérifier si un utilisateur avec le même email existe déjà
        const userByEmail = await userRepository.findOneByEmail(email);
        if (userByEmail) {
            return res.status(409).json("L'utilisateur existe déjà !");
        }

        // Vérifier si un utilisateur avec le même nom d'utilisateur existe déjà
        const userByUsername = await userRepository.findOneByUsername(username);
        if (userByUsername) {
            return res.status(409).json("Le nom d'utilisateur est déjà pris !");
        }

        // Hasher le mot de passe
        const hashedPassword = await argon2.hash(req.body.password);

        // Créer un nouvel utilisateur avec le hash du mot de passe
        await baseRepository.insert("users", { username, email, password: hashedPassword });

        return res.status(200).json("L'utilisateur a été créé");
    } catch (error) {
        console.error(error);
        return res.status(500).json(error.message);
    }
};



export const login = async (req, res) => {
    try {
        // Vérifier si l'utilisateur existe
        const user = await userRepository.findOneByUsername(req.body.username);
        if (!user) {
            return res.status(404).json("Utilisateur non trouvé");
        }

        // Vérifier le mot de passe
        const isPasswordOk = await argon2.verify(user.password, req.body.password);
        if (!isPasswordOk) {
            return res.status(400).json("Nom d'utilisateur ou mot de passe incorrect");
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user.id }, "jwtkey");

        // Retourner l'utilisateur sans le mot de passe et le token d'accès dans un cookie HttpOnly
        const { password, ...other } = user;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200)
            .json(other);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error.message);
    }
};


export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.")
};
