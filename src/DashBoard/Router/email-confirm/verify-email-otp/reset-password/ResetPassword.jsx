import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values) => {
        if (values) {
            Swal.fire({
                title: "Password Reset Successful!",
                text: "Your password has been reset successfully.",
                icon: "success",
                confirmButtonText: "Continue",
                confirmButtonColor: "#00b0f2",
            }).then(() => {
                navigate("/auth/login");
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "Please complete all required fields before submitting.",
                icon: "error",
                confirmButtonText: "Try Again",
                confirmButtonColor: "#00b0f2",
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
                <h1 className="text-center text-2xl font-bold mb-4">Set a new password</h1>
                <p className="text-center text-gray-600 mb-6">
                    Create a new password. Ensure it differs from previous ones for security.
                </p>
                <Form
                    requiredMark={false}
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="space-y-6"
                >
                    {/* New Password Field */}
                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[
                            { required: true, message: 'Please enter your new password!' },
                            { min: 6, message: 'Password must be at least 6 characters!' },
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter your new password"
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>

                    {/* Confirm Password Field */}
                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('The two passwords do not match!')
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Confirm your password"
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>

                    {/* Reset Password Button */}
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            className="w-full h-12 bg-[#00b0f2] hover:bg-[#00b0f2]/70 text-white text-lg font-bold"
                        >
                            Reset Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ResetPassword;
