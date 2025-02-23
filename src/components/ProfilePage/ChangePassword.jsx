import { Form, Input, Button, Typography, message, Spin } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { usePatchNewPasswordMutation } from '../../redux/services/authApis';

const { Title } = Typography;

const ChangePasswordForm = () => {
  const [form] = Form.useForm();
  const [changePassword, { isLoading }] = usePatchNewPasswordMutation();

  const onFinish = async (values) => {
    const data = {
      oldPassword: values.oldPassword,
      confirmNewPassword: values.confirmNewPassword,
      newPassword: values.newPassword,
    };

    try {
      await changePassword(data).unwrap();
      message.success('Password updated successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
      message.error('Failed to update the password. Please try again.');
    }
  };

  return (
    <div>
      <Title level={4} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Change Password
      </Title>
      <Form
        requiredMark={false}
        layout="vertical"
        onFinish={onFinish}
        form={form}
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
      >
        {/* Current Password */}
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[
            { required: true, message: 'Please enter your current password' },
          ]}
        >
          <Input.Password
            style={{
              width: '100%',
              height: 40,
              border: '1px solid black',
              borderRadius: '5px',
              color: '#111',
              backgroundColor: '#fff',
              outline: 'none',
            }}
            placeholder="Enter your current password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: 'Please enter your new password' },
            {
              min: 6,
              message: 'Password must be at least 6 characters',
            },
          ]}
        >
          <Input.Password
            style={{
              width: '100%',
              height: 40,
              border: '1px solid black',
              borderRadius: '5px',
              color: '#111',
              backgroundColor: '#fff',
              outline: 'none',
            }}
            placeholder="Enter your new password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        {/* Confirm New Password */}
        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password
            style={{
              width: '100%',
              height: 40,
              border: '1px solid black',
              borderRadius: '5px',
              color: '#111',
              backgroundColor: '#fff',
              outline: 'none',
            }}
            placeholder="Confirm your new password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        {/* Save Changes Button */}
        <Form.Item>
          <Button
            htmlType="submit"
            disabled={isLoading}
            style={{
              width: '200px',
              justifyContent: 'center',
            }}
            className={`sidebar-button-orange mx-auto`}
          >
            {isLoading ? <Spin size="small" /> : 'Save Changes'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
