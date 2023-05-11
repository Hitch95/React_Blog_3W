import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./public_style/menu.scss";


const Menu = ({ category }) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/posts/?category=${category}`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [category]);

    return (
        <div className="menu">
            <div className="posts">
                {posts.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={post.image} alt="" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`} >
                                <h1>{post.title}</h1>
                                <p>{post.description}</p>
                                <button>Read more</button>
                            </Link>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Menu;
