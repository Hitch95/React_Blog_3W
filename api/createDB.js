import { createClassicConnexion } from "./db.js";
import argon2 from "argon2";


async function createDB() {
    await createClassicConnexion()
        .then(

            async con => {
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
                    image VARCHAR(255) NULL
                )`);

                await con.query(`CREATE TABLE posts(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    author_id INT NOT NULL,
                    title VARCHAR(255) NOT NULL,
                    description VARCHAR(1000) NOT NULL,
                    image VARCHAR(255) NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    category VARCHAR(45),
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
                await con.query(`INSERT INTO users (username, email, password, created_at, image) 
                VALUES 
                    ("johnDoe", "john.doe@mail.com", "${hash}", NOW(), "https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"),
                    ("bigShack", "bigshack@mail.com", "${hash}", NOW(), "https://i.discogs.com/MbIZ7A-13A70n29Qmvn2EaheXSC66uSaBZr3y6eLvyQ/rs:fit/g:sm/q:90/h:434/w:445/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTYwOTU2/MTItMTUxMzc1NjIz/MC0xODE5LmpwZWc.jpeg"),
                    ("dussoOliver", "dusso_oliver@mail.com", "${hash}", NOW(), "https://external-preview.redd.it/olivier-dussopt-a-bien-pris-son-petit-d%C3%A9jeuner-ce-matin-v0-9_hTZO8h_cA8-2Pdr1BAlrGVcbS5b6Qw9-0_2vmkUvc.png?format=pjpg&auto=webp&s=67d4683718220046215f04592373ec77bea3d2e7")
                `);

                await con.query(`INSERT INTO posts (author_id, title, description, category, image)
                VALUES
                    (3, "How I gained 15 kg in 7 months!", 
                        "The muscle mass gain in bodybuilding is a highly debated topic among bodybuilding practitioners. 
                        It consists of increasing muscle mass by increasing calorie consumption to provide the necessary nutrients for muscle growth. 
                        It is important to plan your diet carefully, consuming foods rich in protein, carbohydrates, and healthy fats to achieve mass gain goals.
                        For effective mass gain, regular and intensive training is also required, using weights and exercises that target the muscles. 
                        It is recommended to vary exercises and sets to avoid stagnation and promote muscle growth.
                        Sleep, stress management, and reducing alcohol and tobacco are essential for optimal recovery. 
                        In conclusion, muscle mass gain in bodybuilding requires a comprehensive approach that encompasses diet, 
                        training, and recovery.", 
                        "Nutrition", 
                        "https://leguerrierectomorphe.com/wp-content/uploads/2019/10/comment-prendre-du-poids-ectomorphe.png"),
                    (2, "Top 5 exercises to develop your biceps!", 
                        "Biceps are among the most popular muscles to work on in bodybuilding. 
                        Here are the top five exercises to develop your biceps. 
                        The first one is the barbell curl, an exercise that works the biceps in a global way. 
                        The second one is the EZ bar inclined curl, which allows you to work on the biceps in an isolated way. 
                        The third exercise is the concentrated curl, which targets the biceps deeply. 
                        The fourth one is the low pulley curl, which allows you to vary the angles of work and to work on the biceps from a different angle. 
                        Finally, the fifth exercise is the hammer curl, which targets both the biceps and the forearms. 
                        By regularly performing these five exercises, 
                        you can effectively develop your biceps and improve your physical appearance.", 
                        "Workout", 
                        "https://i.ytimg.com/vi/yR9Wpyf8gbk/maxresdefault.jpg");
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

            })
        .catch(error => { console.error(`Erreur lors de la création de la table : ${error}`); })
};

createDB();