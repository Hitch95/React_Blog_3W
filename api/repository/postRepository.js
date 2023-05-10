import baseRepository from "./baseRepository.js";

async function insertPost(post) {
    const { author_id, title, description, image } = post;
    const data = {
        author_id,
        title,
        description,
        image,
    };

    return baseRepository.insert("posts", data);
}

export async function updatePost(id, entries) {
    await baseRepository.update("posts", id, entries);
}

export async function deletePost(id) {
    await deleteRow("posts", id);
}

export async function findPost(id) {
    return baseRepository.findOne(` SELECT posts.id, users.username, posts.title, posts.description, posts.image, posts.created_at, users.image AS userImg, posts.category
                                    FROM posts
                                    INNER JOIN users ON users.id = posts.author_id
                                    WHERE posts.id = ?
                                `,
        [id]
    );
}

export async function findAllPosts() {
    return baseRepository.findAll("posts");
}



export default {
    insertPost,
    updatePost,
    deletePost,
    findPost,
    findAllPosts,
    ...baseRepository
}