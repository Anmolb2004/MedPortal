import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./Pages/AboutUs.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import Appointment from "./Pages/Appointment.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/NavBar/Navbar.jsx";
import { Context } from "./main.jsx";
import axios from "axios";
import Footer from "./components/Footer/Footer.jsx";
import Doctors from "./Pages/Doctors.jsx";
import Department from "./Pages/Department.jsx";

const App = () => {
  const {isAuthenticated, setIsAuthenticated,setUser} = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://medportal.onrender.com/api/v1/user/patient/me", { withCredentials: true });
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      } finally {
          setLoading(false)// Ensure that loading is set to false regardless of success or failure
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;  // Show a loading spinner or placeholder
  }
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor" element={<Doctors />} />
          <Route path="/department" element={<Department />} />
        </Routes>
        <Footer/>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
