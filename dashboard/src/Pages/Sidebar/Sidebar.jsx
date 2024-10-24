import React, { useContext, useState } from "react";
import { Context } from "../../main.jsx";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Sidebar.css";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard"); // Active state to track the selected section
  const [show, setShow] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateto = useNavigate();

  const handleNavigation = (section, path) => {
    setActive(section); // Update active section
    navigateto(path);
  };

  const handleLogout = async () => {
    await axios
      .get("https://medportal.onrender.com/api/v1/user/admin/logout", {
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

  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <h2>Hospital Management</h2>
        <div className="links">
          <div
            onClick={() => handleNavigation("Dashboard", "/")}
            className={active === "Dashboard" ? "active" : ""}
          >
            <TiHome />
            <h4>Dashboard</h4>
          </div>
          <div
            onClick={() => handleNavigation("Doctors", "/doctors")}
            className={active === "Doctors" ? "active" : ""}
          >
            <FaUserDoctor />
            <h4>Doctors</h4>
          </div>
          <div
            onClick={() => handleNavigation("Add new Admin", "/admin/addnew")}
            className={active === "Add new Admin" ? "active" : ""}
          >
            <MdAddModerator />
            <h4>Add new Admin</h4>
          </div>
          <div
            onClick={() => handleNavigation("Add new Doctor", "/doctor/addnew")}
            className={active === "Add new Doctor" ? "active" : ""}
          >
            <IoPersonAddSharp />
            <h4>Add new Doctor</h4>
          </div>
          <div
            onClick={() => handleNavigation("Messages", "/message")}
            className={active === "Messages" ? "active" : ""}
          >
            <AiFillMessage />
            <h4>Messages</h4>
          </div>
          <div
            onClick={handleLogout}
            className={active === "Logout" ? "active" : ""}
          >
            <RiLogoutBoxFill />
            <h4>Logout</h4>
          </div>
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
