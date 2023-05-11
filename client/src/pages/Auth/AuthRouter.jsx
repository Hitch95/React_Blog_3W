import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import "./auth.scss";

import Error from "../../../_utils/Error";

const AuthRouter = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
};



export default AuthRouter;