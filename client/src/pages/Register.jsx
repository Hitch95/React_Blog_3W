import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/api/auth/register", inputs);
            console.log(res.data);
            navigate("/login");
        } catch (error) {
            setError(error.response.data);
        }
    };

    return (
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input type="text" placeholder="username" name="username" onChange={handleChange} required />
                <input type="mail" placeholder="email" name="mail" onChange={handleChange} required />
                <input type="password" placeholder="password" name="password" onChange={handleChange} required />
                <button onClick={handleSubmit}>Register</button>
                {error && <p>{error}</p>}
                <span>
                    Do you have an account? 
                    <Link to="/login">Login</Link>
                </span>
            </form>
        </div>
    );
};

export default Register;
