import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.css"

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const handleLogout = async () => {
    await axios
      .get("https://medportal.onrender.com/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const gotoLogin = () => {
    navigateTo("/login");
  };
  return (
    <nav>
      <div className="logo">
        <img src="/logo.png" alt="logo" className="logo-img" />
      </div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"}>Home</Link>
          <Link to={"/appointment"}>Appointment</Link>
          <Link to={"/doctor"}>Doctor</Link>
          <Link to={"/department"}>Department</Link>
          <Link to={"/about"}>About Us</Link>
        </div>
        {isAuthenticated ? (
          <div className="navbar-profile">
            <img src={"/image.png"} alt="" />
                    <ul className='navbar-profile-dropdown'>
                        <li><p>My Profile</p></li>
                        <hr />
                        <li onClick={()=>{handleLogout()}}><p>Log Out</p></li>
                    </ul>
          </div>
        ) : (
          <button onClick={gotoLogin} className="loginBtn btn">
            LogIn
          </button>
        )}
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
