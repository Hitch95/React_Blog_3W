import { Routes, Route } from "react-router-dom";

import { AdminLayout, Dashboard, 
         User, UserAdd, UserEdit, 
         Post, PostAdd, PostEdit 
        } from "../../pages/Admin";

import Error from "../../../_utils/Error";

const AdminRouter = () => {
    return (
        <Routes>
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
        </Routes>
    )
}

export default AdminRouter;