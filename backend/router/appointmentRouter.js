import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateStatus,
  getUserAppointments,
} from "../controller/appointmentController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);
router.get("/userappointments", isPatientAuthenticated, getUserAppointments);

export default router;
