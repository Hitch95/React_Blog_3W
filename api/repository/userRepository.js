import baseRepository from "./baseRepository.js";

async function findOneByEmail(email) {
    return baseRepository.findOne(`SELECT * FROM users WHERE email = ?`, [email]);
}

async function findOneByUsername(username) {
    return baseRepository.findOne(`SELECT * FROM users WHERE email = ?`, [username]);
}

async function findOneById(id) {
    return baseRepository.findOne(`SELECT * FROM users WHERE username = ?`, [id]);
}

async function insertUser(user) {
    const { username, email, password } = user;
    const data = {
        username,
        email,
        password,
    };

    return baseRepository.insert("users", data);
}



export default {
    findOneByEmail,
    findOneByUsername,
    findOneById,
    insertUser,
    ...baseRepository,
};
