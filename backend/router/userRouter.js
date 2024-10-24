import express from "express";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getAllUsers,
  getUserDetails,
  logOutAdmin,
  logOutPatient,
  login,
  patientRegister,
} from "../controller/userController.js";
import { isAdmin, isPatient } from "../middlewares/auth.js";

const router = express.Router();
router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdmin, addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/users", getAllUsers);
router.get("/admin/me", isAdmin, getUserDetails);
router.get("/patient/me", isPatient, getUserDetails);
router.get("/admin/logout", isAdmin, logOutAdmin);
router.get("/patient/logout", isPatient, logOutPatient);
router.post("/doctor/addnew", isAdmin, addNewDoctor);
export default router;
