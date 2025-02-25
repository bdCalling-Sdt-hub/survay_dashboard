import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Register = () => {
    const onFinish = (values) => {
        console.log('Register Submitted:', values);
        // Add register logic here
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white p-8 h-auto rounded-xl shadow-md max-w-md w-full">
                <h1 className="text-center text-2xl font-bold mb-4">Create an Account</h1>
                <p className="text-center text-gray-600 mb-6">
                    Please enter your email and password to register
                </p>
                <Form
                    requiredMark={false}
                    layout="vertical" onFinish={onFinish} className="space-y-6">
                    <Form.Item
                        name="email"
                        label="Email address"
                        rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                    >
                        <Input placeholder="example@gmail.com" className="h-12 text-gray-700" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            className='h-12'
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Re-Type Password"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
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
                            placeholder="Re-enter your password"
                            className='h-12'
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            htmlType="submit"
                            className="w-full h-12 bg-[#00b0f2] hover:bg-[#00b0f2]/70 text-white text-lg font-bold"
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <h1 className='text-black text-sm md:text-base mt-6'>
                    Already have an account?
                    <Link to='/auth/login' className='text-[#00B0F2] underline'>
                        Go to login
                    </Link>
                </h1>
            </div>
        </div>
    );
};

export default Register
