import { createClassicConnexion } from "../db.js";
import postRepository from "../repository/postRepository.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/verifyToken.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await postRepository.findAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des posts.");
    }
};


export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postRepository.findPost(id);
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Erreur lors de la récupération du post avec l'id ${id}.`);
    }
};



export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const query =
            "INSERT INTO posts(`title`, `description`, `image`, `category`,`author_id`) VALUES (?)";

        const values = [
            req.body.title,
            req.body.description,
            req.body.image,
            req.body.category,
            userInfo.id,
        ];

        db.query(query, [values], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.json("Post has been created.");
        });
    });
};


export const deletePost = (req, res) => {
    authMiddleware(req, res, () => {
        const postId = req.params.id;
        console.log(postId);
        const token = req.cookies.access_token;
        console.log(token);
        jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
            if (err) return res.status(403).json({ error: "Le token n'est pas valide!" });
            const query = `DELETE FROM posts WHERE ${id} = ? AND ${author_id} = ?`;
            db.query(query, [postId, userInfo.id], (err, data) => {
                if (err) return res.status(403).json({ error: "Vous ne pouvez supprimer que votre propre post!" });
                return res.json({ message: "Le post a été supprimé!" });
            });
        });
    });
};


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const entries = req.body;

    try {
        await postRepository.updatePost(id, entries);
        const updatedPost = await postRepository.findPost(id);
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Erreur lors de la mise à jour du post avec l'id ${id}.`);
    }
};
