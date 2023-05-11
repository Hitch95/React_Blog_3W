import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
    const state = useLocation().state;
    const [value, setValue] = useState(state?.title || "");
    const [title, setTitle] = useState(state?.description || "");
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState(state?.category || "");

    const navigate = useNavigate()

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file)
            const res = await axios.post("/upload", formData)
            return res.data;
        } catch (err) {
            console.log(err)
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();

        try {
            state
                ? await axios.put(`/posts/${state.id}`, {
                    title,
                    description: value,
                    category,
                    image: file ? imgUrl : "",
                })
                : await axios.post(`/posts/`, {
                    title,
                    description: value,
                    category,
                    image: file ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                });
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="add">
            <div className="content">content
                <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="editorContainer">
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        name=""
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label className="file" htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={category === "workout"}
                            name="category"
                            value="workout"
                            id="workout"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="workout">Workout</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={category === "nutrition"}
                            name="category"
                            value="nutrition"
                            id="nutrition"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="nutrition">Science</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={category === "mindset"}
                            name="category"
                            value="mindset"
                            id="mindset"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="mindset">Mindset</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={category === "other"}
                            name="category"
                            value="other"
                            id="other"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="other">Other</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write;
