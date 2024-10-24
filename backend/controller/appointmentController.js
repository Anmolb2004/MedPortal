import { Appointment } from "../models/appointmentSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import fs from "fs";
import path from "path"
import csv from "csv-parser"

const customDir = path.join(
  "/Users/macbook/Desktop/MinorProject",
  "backend",
  "appointments.csv"
);
const initializeCSV = () => {
  if (!fs.existsSync(customDir)) {
    const headers =
      "Patient Name,Doctor Name,Appointment Date,Appointment Status\n";
    fs.writeFileSync(customDir, headers, (err) => {
      if (err) {
        console.error("Error initializing CSV file:", err);
      }
    });
  }
};

const loadAppointments = async () => {
  const appointments = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(customDir)
      .pipe(csv())
      .on('data', (data) => appointments.push(data))
      .on('end', () => resolve(appointments))
      .on('error', (error) => reject(error));
  });
};

const writeAppointments = (appointments) => {
  const headers = 'Patient Name,Doctor Name,Appointment Date,Appointment Status\n';
  const rows = appointments
    .map(({ 'Patient Name': patientName, 'Doctor Name': doctor, 'Appointment Date': date, 'Appointment Status': status }) => 
      `${patientName},${doctor},${date},${status}`
    ).join('\n') + '\n';

  fs.writeFileSync(customDir, headers + rows, (err) => {
    if (err) {
      console.error('Error writing to CSV file:', err);
    }
  });
};

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    nic,
    dob,
    gender,
    doctor_firstName,
    doctor_lastName,
    appointment_date,
    department,
    hasVisited,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !address ||
    !nic ||
    !dob ||
    !gender ||
    !doctor_firstName ||
    !doctor_lastName ||
    !appointment_date ||
    !department
  ) {
    return next(new ErrorHandler("Please fill full form", 400));
  }
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor Not Found", 404));
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email or Phone",
        404
      )
    );
  }
  initializeCSV();
  const newAppointment = `${firstName} ${lastName},${doctor_firstName} ${doctor_lastName},${appointment_date},"Pending"\n`;
  fs.appendFile(customDir, newAppointment, (err) => {
    if (err) {
      console.error("Error writing to CSV file:", err);
      return res.status(500).json({ error: "Failed to book appointment" });
    }
    res.status(200).json({ message: "Appointment booked successfully" });
  });
  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    address,
    nic,
    dob,
    gender,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    appointment_date,
    department,
    hasVisited,
    doctorId,
    patientId,
  });
 

  res.status(200).json({
    success: true,
    message: "Appointment Sent Successfully",
    appointment,
  });
});

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

export const updateStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 404));
  }
  const appointments = await loadAppointments();
  const appointmentIndex = appointments.findIndex(app =>
    app['Patient Name'] === `${appointment.firstName} ${appointment.lastName}` &&
    app['Doctor Name'] === `${appointment.doctor.firstName} ${appointment.doctor.lastName}` &&
    app['Appointment Date'] === `${appointment.appointment_date}`
  );
  if (appointmentIndex === -1) {
    return res.status(404).json({ error: 'Appointment not found' });
  }
  appointments[appointmentIndex]['Appointment Status'] = req.body.status;
  
  // Write the updated appointments back to the CSV file
  writeAppointments(appointments);

  appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Appointment Status Updated Successfully",
    appointment,
  });
});

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted Successfully",
  });
});
