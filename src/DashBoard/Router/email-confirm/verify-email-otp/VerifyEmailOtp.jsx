import { useState } from "react";
import { Input, Button, message } from "antd";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../../../redux/services/authApis";

const VerifyEmailOtp = () => {
  const email = localStorage.getItem("email");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resentOtp] = useResendOtpMutation();
  const navigate = useNavigate();
  useVerifyOtpMutation();
  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < 4) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleVerify = async () => {
    const email = localStorage.getItem("email");
    const otpString = otp.join("");
    const otpNumberConvert = Number(otpString);

    if (!otpString || otpString.length !== 5) {
      message.error("Please enter a valid 6-digit OTP.");
      return;
    }

    const data = {
      email,
      resetCode: otpNumberConvert,
    };

    try {
      const response = await verifyOtp(data).unwrap();
      console.log("OTP Verified:", response);

      message.success("OTP Verified! Redirecting...");

      setTimeout(() => {
        navigate("/auth/login/email-confirm/verify-email-otp/reset-password");
      }, 1500);
    } catch (err) {
      console.error(err);
      message.error("Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      message.error("No email found. Please try again.");
      return;
    }
    const data = { email };
    try {
      const response = await resentOtp(data).unwrap();

      if (response?.success) {
        message.success("OTP has been resent successfully. Check your email.");
      } else {
        const errorMessage =
          response?.message || "Failed to resend OTP. Please try again.";
        message.error(errorMessage);
      }
    } catch (err) {
      console.error("Failed to resend OTP:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again later.";

      message.error(errorMessage);
    }
  };
  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <div className="shadow-md p-6 flex flex-col md:gap-12 py-12 rounded-xl max-w-md w-full">
        <h2 className="text-center text-2xl font-bold mb-6">
          Check your email
        </h2>
        <p className="text-center text-gray-600 mb-6">
          We sent a reset link to <strong>{email}</strong>. Enter the 5-digit
          code mentioned in the email.
        </p>
        <div className="flex justify-center space-x-2 mb-6">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-input-${index}`}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg font-bold rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300"
              maxLength={1}
            />
          ))}
        </div>
        <Button
          type="primary"
          className="w-full py-2 rounded-sm text-white bg-[#00b0f2] hover:bg-[#00b0f2]/70"
          onClick={handleVerify}
          disabled={!isOtpComplete || isLoading}
        >
          {isLoading ? "Verifying OTP..." : "Verify OTP"}
        </Button>
        <p className="text-center text-gray-600 mt-4">
          You have not received the email?{" "}
          <a
            onClick={handleResendOtp}
            className="text-[#00b0f2] hover:underline cursor-pointer"
          >
            Resend
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailOtp;
