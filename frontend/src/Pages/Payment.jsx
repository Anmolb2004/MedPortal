import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointmentId } = location.state || {}; // Get appointmentId from navigation state
  const [paymentOption, setPaymentOption] = useState("UPI");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expDate, setExpDate] = useState("");
  const [otp, setOtp] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(""); // To show success or failure message
  const [isOtpSent, setIsOtpSent] = useState(false); // To track OTP sent status
  const [otpSentTo, setOtpSentTo] = useState(""); // To show where OTP was sent (mobile/email)

  // Simulate a payment process
  const handlePayment = () => {
    if (!cardNumber || !cvv || !expDate) {
      alert("Please fill in all the card details.");
      return;
    }

    setIsProcessing(true); // Set loading state

    // Simulate sending OTP after card details are entered
    setTimeout(() => {
      setIsOtpSent(true); // OTP is now sent
      setOtpSentTo("mobile"); // Simulate OTP sent to mobile (could be email too)
      setIsProcessing(false);
    }, 1000); // Simulate OTP sent after 1 second

  };

  const verifyOtp = () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    setIsProcessing(true); // Set loading state

    // Simulating OTP verification and payment success/failure
    setTimeout(() => {
      const isPaymentSuccessful = Math.random() > 0.2; // 80% chance of success

      if (isPaymentSuccessful) {
        setPaymentStatus("Payment Successful!");
        setIsProcessing(false);
        setTimeout(() => {
          navigate("/profile"); // Redirect to profile after 2 seconds
        }, 2000);
      } else {
        setPaymentStatus("Payment Failed. Please try again.");
        setIsProcessing(false);
      }
    }, 3000); // Simulating 3-second processing time
  };

  return (
    <div className="payment-container">
      <h1>Payment Page</h1>
      <h3>Appointment ID: {appointmentId}</h3>
      <div className="payment-section">
        <h4>Select Payment Method</h4>
        <select
          value={paymentOption}
          onChange={(e) => setPaymentOption(e.target.value)}
          className="payment-select"
        >
          <option value="UPI">UPI</option>
          <option value="Credit/Debit Card">Credit/Debit Card</option>
          <option value="Net Banking">Net Banking</option>
        </select>

        {paymentOption === "Credit/Debit Card" && (
          <div className="card-details">
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter your card number"
              maxLength="16"
            />
          </div>
        )}

        {paymentOption === "Credit/Debit Card" && (
          <div className="cvv-expiry">
            <div className="cvv-input">
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="Enter CVV"
                maxLength="3"
              />
            </div>
            <div className="expiry-input">
              <label>Expiration Date</label>
              <input
                type="text"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                placeholder="MM/YY"
                maxLength="5"
              />
            </div>
          </div>
        )}

        {!isOtpSent ? (
          <button onClick={handlePayment} className="pay-button" disabled={isProcessing}>
            {isProcessing ? "Sending OTP..." : "Proceed to Payment"}
          </button>
        ) : (
          <div className="otp-section">
            <h4>OTP Sent to your {otpSentTo}</h4>
            <label>Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              maxLength="6"
            />
            <button onClick={verifyOtp} className="pay-button" disabled={isProcessing}>
              {isProcessing ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {paymentStatus && <p className={`payment-status ${paymentStatus.includes("Successful") ? "success" : "fail"}`}>{paymentStatus}</p>}
      </div>
    </div>
  );
};

export default Payment;

