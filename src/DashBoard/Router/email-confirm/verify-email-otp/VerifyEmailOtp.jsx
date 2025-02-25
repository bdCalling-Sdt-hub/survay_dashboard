import { useState } from 'react';
import { Input, Button, message } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom';
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from '../../../../redux/services/authApis';
import toast from 'react-hot-toast';

const VerifyEmailOtp = () => {
  const email = localStorage.getItem('email');
  const [otp, setOtp] = useState('');
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resentOtp] = useResendOtpMutation();
  const navigate = useNavigate();

  const handleVerify = async () => {
    const otpNumberConvert = Number(otp);

    if (!otp || otp.length !== 5) {
      toast.error('Please enter a valid 5-digit OTP.');
      return;
    }

    const data = {
      email,
      resetCode: otpNumberConvert,
    };

    try {
      const response = await verifyOtp(data).unwrap();
      toast.success('OTP Verified! Redirecting...');
      setTimeout(() => {
        navigate('/auth/login/email-confirm/verify-email-otp/reset-password');
      }, 1500);
    } catch (err) {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error('No email found. Please try again.');
      return;
    }
    const data = { email };
    try {
      const response = await resentOtp(data).unwrap();

      if (response?.success) {
        toast.success('OTP has been resent successfully. Check your email.');
      } else {
        const errorMessage =
          response?.message || 'Failed to resend OTP. Please try again.';
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Failed to resend OTP:', err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong. Please try again later.';

      toast.error(errorMessage);
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
        <div className="flex justify-center mb-6">
          <Input.OTP
            length={5}
            value={otp}
            onChange={setOtp}
            className="w-full"
            inputClassName="w-12 h-12 text-center text-lg font-bold rounded-md shadow-sm border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300"
          />
        </div>
        <Button
          type="primary"
          className="w-full py-2 rounded-sm text-white bg-[#00b0f2] hover:bg-[#00b0f2]/70"
          onClick={handleVerify}
          disabled={otp.length !== 5 || isLoading}
        >
          {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
        </Button>
        <p className="text-center text-gray-600 mt-4">
          You have not received the email?{' '}
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
