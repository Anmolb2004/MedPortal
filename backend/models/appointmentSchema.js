import mongoose from "mongoose";
import validator from "validator";

const AppointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain atleast 3 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "last name must contain atleast 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must contain exactly 10 digits"],
    maxLength: [10, "Phone number must contain exactly 10 digits"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [10, "NIC must contain exactly 10 digits"],
    maxLength: [10, "NIC must contain exactly 10 digits"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required"],
  },
  gender: {
    type: String,
    required: true,
    enem: ["Male", "Female"],
  },
  appointment_date: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  hasVisited: {
    type: Boolean,
    required: true
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  address:{
    type: String,
    default: false
  },
  status:{
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Completed", "NotVisited"],
    default: "Pending"
  }
});

export const Appointment = mongoose.model("Appointment", AppointmentSchema);