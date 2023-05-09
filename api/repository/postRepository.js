import baseRepository from "./baseRepository.js";

async function findPostBySlug(slug) {
    return baseRepository
        .findOne(`SELECT p.*, u.username AS author_pseudo FROM posts p
            INNER JOIN users u ON u.id = p.author_id
            WHERE p.slug = ?`, 
            [slug]
        )
}

async function findPost(id) {
    return baseRepository
        .findOne(`SELECT p.*, u.username AS author_pseudo FROM posts p
        INNER JOIN users u ON u.id = p.author_id
        WHERE p.id = ?`, 
            [id]
        )
}

export default {
    findPostBySlug,
    findPost,
    ...baseRepository
}