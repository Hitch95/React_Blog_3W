import { Outlet } from "react-router-dom";

import Header from "../../components/admin/Header";
import SideMenu from "../../components/admin/SideMenu";

const AdminLayout = () => {
    return (
        <div className="AdminLayout">
            <Header />
            <div id="admin">
                <SideMenu />
                <div id="admin_body">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout;