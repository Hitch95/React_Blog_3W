import { createClassicConnexion } from "../db.js";
import postRepository from "../repository/postRepository.js";
import jwt from "jsonwebtoken";


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

export const addPost = async (req, res) => {
    const { author_id, title, description, image } = req.body;
    const post = {
        author_id,
        title,
        description,
        image,
    };

    try {
        const result = await postRepository.insertPost(post);
        const createdPost = await postRepository.findPost(result.insertId);
        res.status(201).json(createdPost);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création du post.");
    }
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Non authentifié!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Le token n'est pas valide!");

    const postId = req.params.id;
    const query = "DELETE FROM posts WHERE `id` = ? AND `user_id` = ?";

    db.query(query, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("Vous ne pouvez supprimer que votre propre post!");

      return res.json("Le post a été supprimé!");
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
