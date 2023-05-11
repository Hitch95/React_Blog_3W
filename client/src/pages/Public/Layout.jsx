import { Outlet } from "react-router-dom";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";

import "../../components/public/public_style/navbar.scss";
import "../../components/public/public_style/footer.scss";

const Layout = () => {
    return (
        <div className="layout">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout;