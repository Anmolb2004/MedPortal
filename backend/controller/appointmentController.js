import { Appointment } from "../models/appointmentSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js"; // Import the sendEmail function

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

  // Send email to patient after booking
  await sendEmail({
    email,
    subject: "Appointment Confirmation",
    message: `Dear ${firstName} ${lastName}, your appointment with Dr. ${doctor_firstName} on ${appointment_date} has been successfully booked.`,
  });

  res.status(200).json({
    success: true,
    message: "Appointment Sent Successfully and Email Sent.",
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
  const { status } = req.body;

  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 404));
  }

  appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // Send email to patient on status update
  await sendEmail({
    email: appointment.email,
    subject: "Appointment Status Update",
    message: `Dear ${appointment.firstName}, your appointment status has been updated to: ${status}.`,
  });

  res.status(200).json({
    success: true,
    message: "Appointment Status Updated Successfully and Email Sent.",
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

