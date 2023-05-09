import baseRepository from "./baseRepository.js";

async function findOneByEmail(email) {
    return baseRepository
        .findOne(`SELECT * FROM users WHERE username = ?`, [email])
}

export default {
    findOneByEmail,
    ...baseRepository
}