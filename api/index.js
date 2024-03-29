import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";

import authMiddleware from "./middleware/verifyToken.js";
import { addPost } from "./controllers/post.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage })

app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file
    res.status(200).json(file.filename);
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.post('/api/posts', authMiddleware, addPost);

app.listen(8800, () => {
    console.log("Connected to backend");
});