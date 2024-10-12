import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/home.jsx";
import Appointment from "./pages/appointment.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/NavBar/Navbar.jsx";
import { Context } from "./main.jsx";
import axios from "axios";
import Footer from "./components/Footer/Footer.jsx";
import Doctors from "./pages/Doctors.jsx";
import Department from "./pages/Department.jsx";

const App = () => {
  const {isAuthenticated, setIsAuthenticated,setUser} = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/patient/me", { withCredentials: true });
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
