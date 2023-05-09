import baseRepository from "./baseRepository.js";

async function findUserRoles(userId) {
    return baseRepository
        .find(`SELECT roles.name FROM roles
            INNER JOIN user_roles ON user_roles.role_id = roles.id
            INNER JOIN users ON users.id = user_roles.user_id
            WHERE users.id = ?`, 
            [userId]
        )
}

export default {
    findUserRoles,
    ...baseRepository
}