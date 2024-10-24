import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Login from "./Pages/Login.jsx";
import AddNewDoctor from "./Pages/AddNewDoctor.jsx";
import Doctors from "./Pages/Doctors/Doctors.jsx";
import AddNewAdmin from "./Pages/AddNewAdmin.jsx";
import Message from "./Pages/Message/Message.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { Context } from "./main.jsx";
import axios from "axios";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "./Pages/Sidebar/Sidebar.jsx";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [messages, setMessages] = useState([]);

  var count = 0;
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://medportal.onrender.com/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
        count++;
      } catch (error) {
        setAppointments([]);
        console.log(error);
      }
    };
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "https://medportal.onrender.com/api/v1/user/users",
          { withCredentials: true }
        );

        setUsers(data.users);
        count++;
      } catch (error) {
        setUsers([]);
        console.log(error);
      }
    };
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://medportal.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
        setDoctor(data.doctors[1]);
        count++;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "https://medportal.onrender.com/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
        count++;
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
    fetchDoctors();
    fetchAppointments();
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://medportal.onrender.com/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
        count++;
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                appointments={appointments}
                doctors={doctors}
                doctor={doctor}
                users={users}
                setAppointments={setAppointments}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor/addnew" element={<AddNewDoctor />} />
          <Route path="/admin/addnew" element={<AddNewAdmin />} />
          <Route path="/message" element={<Message messages={messages} />} />
          <Route path="/doctors" element={<Doctors doctors={doctors} />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
