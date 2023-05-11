import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        try {
            const res = await axios.post("http://localhost:8800/api/auth/login", inputs);
            setCurrentUser(res.data);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const isAdmin = async () => {
        try {
            const res = await axios.get("http://localhost:8800/api/auth/isAdmin");
            return res.data.isAdmin;
        } catch (error) {
            console.error(error);
        }
    };


    const logout = async (inputs) => {
        await axios.post("http://localhost:8800/api/auth/logout");
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};