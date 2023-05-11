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
            const res = await axios.post("http://localhost:8800/api/auth/register", inputs);
            navigate("/login");
        } catch (error) {
            setError(error.res.data);
        }
    };
    

    return (
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input type="text" placeholder="username" name="username" onChange={handleChange} required />
                <input type="email" placeholder="email" name="email" onChange={handleChange} required />
                <input type="password" placeholder="password" name="password" onChange={handleChange} required />
                <button onClick={handleSubmit}>Register</button>
                {error && <p>{error}</p>}
                <span>
                    Do you have an account? 
                    <Link to="/auth/login">Login</Link>
                </span>
            </form>
        </div>
    );
};

export default Register;
