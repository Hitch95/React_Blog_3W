import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/authContext";

import Logo from "../../images/Logo.png";


const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="container">

        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="toggle" onClick={handleToggle}>
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div className={`links ${isOpen ? "" : "active"}`}>
          <Link className="link" to="/?category=workout">
            <h6>WORKOUT</h6>
          </Link>
          <Link className="link" to="/?category=nutrition">
            <h6>NUTRITION</h6>
          </Link>
          <Link className="link" to="/?category=mindset">
            <h6>MINDSET</h6>
          </Link>
          <Link className="link" to="/?category=other">
            <h6>OTHER</h6>
          </Link>
        </div>

        <span className="username">{currentUser?.username}</span>
        {currentUser ? (
          <span onClick={logout}>Logout</span>
        ) : (
          <Link className="link" to="/auth/login">
            Login
          </Link>
        )}

        <span className="write">
          <Link className="link" to="/write">
            Write
          </Link>
        </span>
      </div>

    </nav>
  );
};

export default Navbar;
