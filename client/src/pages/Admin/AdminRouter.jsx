import { useContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import {
    AdminLayout, Dashboard,
    User, UserAdd, UserEdit,
    Post, PostAdd, PostEdit
} from "../../pages/Admin";
import { AuthContext } from "../../context/authContext";

import Error from "../../../_utils/Error";

import "../../style.scss"

const AdminRouter = () => {

    const { currentUser } = useContext(AuthContext);

    const isAdmin = () => {
        return currentUser && currentUser.role_name === "admin";
    };

    return (
        <Routes>
            {isAdmin() ? (
                <Route element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="user">
                        <Route path="index" element={<User />} />
                        <Route path="edit/:user_id" element={<UserEdit />} />
                        <Route path="add" element={<UserAdd />} />
                    </Route>
                    <Route path="post">
                        <Route path="index" element={<Post />} />
                        <Route path="edit/:post_id" element={<PostEdit />} />
                        <Route path="add" element={<PostAdd />} />
                    </Route>
                    <Route path="*" element={<Error />} />
                </Route>
            ) : (
                <Route path="/auth/login" element={<Navigate to="/auth/login" />} />
            )}
        </Routes>
    );
};

export default AdminRouter;