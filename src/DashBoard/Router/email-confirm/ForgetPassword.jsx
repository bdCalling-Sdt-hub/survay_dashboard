import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForgetEmailPostMutation } from '../../../redux/services/authApis';
import toast from 'react-hot-toast';
const ForgetPassword = () => {
  const [forgotPassword] = useForgetEmailPostMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    const { email } = values;
    const emailData = { email };

    try {
      const response = await forgotPassword(emailData).unwrap();

      if (response?.success) {
        toast.success('Check your email for the OTP.');
        localStorage.setItem('email', email);
        navigate('/auth/login/email-confirm/verify-email-otp');
      } else {
        const errorMessage =
          response?.message || 'An unexpected error occurred.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Request failed:', err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong. Please try again later.';

      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-4">
          Forget Password?
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Please enter your email to get a verification code
        </p>
        {error && <p className="text-red-400 text-base">{error}</p>}
        <Form
          requiredMark={false}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-6"
        >
          {/* Email Address Input */}
          <Form.Item
            name="email"
            label="Email address"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              placeholder="example@gmail.com"
              className="h-12 text-gray-700"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold"
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
