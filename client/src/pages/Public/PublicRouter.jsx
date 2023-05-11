import { Routes, Route } from "react-router-dom";

import { Layout, Home, Single, Write } from "../Public";
import "./public_files.scss";

import Error from "../../../_utils/Error";


const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<Layout />}>

                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<Single />} />
                <Route path="/write" element={<Write />} />

                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
};

export default PublicRouter;