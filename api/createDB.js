import { createClassicConnexion } from "./db.js";
import argon2 from "argon2";


(async function createDB() {
    try {
        const con = createClassicConnexion();
        // On supprime les tables
        await con.query("DROP TABLE IF EXISTS user_roles");
        await con.query("DROP TABLE IF EXISTS roles");
        await con.query("DROP TABLE IF EXISTS posts");
        await con.query("DROP TABLE IF EXISTS users");


        // Création des tables
        await con.query(`CREATE TABLE users(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(45) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    img VARCHAR(255) NULL
                )`);

        await con.query(`CREATE TABLE posts(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    author_id INT NOT NULL,
                    title VARCHAR(255) NOT NULL,
                    description VARCHAR(1000) NOT NULL,
                    img VARCHAR(255) NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY(author_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
                )`);

        await con.query(`CREATE TABLE roles(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL
                )`);

        await con.query(`CREATE TABLE user_roles(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NOT NULL,
                    role_id INT NOT NULL,
                    FOREIGN KEY(user_id) REFERENCES users(id),
                    FOREIGN KEY(role_id) REFERENCES roles(id)
                )`);


        // Remplissage des tables
        const hash = await argon2.hash("password");
        await con.query(`INSERT INTO users (username, email, password, created_at, img) 
                VALUES 
                    ("johnDoe", "john.doe@mail.com", "${hash}", NOW(), "image.png"),
                    ("bigShack", "bigshack@mail.com", "${hash}", NOW(), "image2.png"),
                    ("carlosGhosn", "carlos@mail.com", "${hash}", NOW(), "image3.png")
                `);

        await con.query(`INSERT INTO posts (author_id, title, description, img, created_at)
                VALUES
                    (1, "This is my title", "This is my very long description", "chemin/vers/image2.jpg", NOW());

            `)
        await con.query(`INSERT INTO roles (name)
                VALUES  
                    ("ROLE_ADMIN"),
                    ("ROLE_MODERATOR"),
                    ("ROLE_USER")
                `);

        await con.query(`INSERT INTO user_roles (user_id, role_id)  
                VALUES 
                    (1, 1),
                    (2, 2),
                    (3, 3)
                `);

        console.log("Tables créées avec succès !");
        con.end();

    } catch (error) {
        console.error(error);
    }
}) ();
