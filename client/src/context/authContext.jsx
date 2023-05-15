import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";


export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) ?? null
    );

    const login = async (inputs) => {
        try {
            const res = await axios.post("http://localhost:8800/api/auth/login", inputs);
            const user = res.data;
            Cookies.set("access_token", user.token, { expires: 1, path: "/" });
            setCurrentUser(user);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async (inputs) => {
        Cookies.remove("access_token", { path: "/" });
        await axios.post("http://localhost:8800/api/auth/logout");
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};