import { Form, Input, Button, Typography, message, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { usePatchNewPasswordMutation } from "../../../redux/services/authApis";

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
      const result = await changePassword(data).unwrap();
      console.log("Password changed successfully:", result);
      message.success("Password updated successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      message.error("Failed to update the password. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <Title level={4} style={{ textAlign: "center", marginBottom: "20px" }}>
        Change Password
      </Title>
      <Form
        requiredMark={false}
        layout="vertical"
        onFinish={onFinish}
        form={form}
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
      >
        {/* Current Password */}
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[
            { required: true, message: "Please enter your current password" },
          ]}
        >
          <Input.Password
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
            { required: true, message: "Please enter your new password" },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
          ]}
        >
          <Input.Password
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
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm your new password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        {/* Save Changes Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
              backgroundColor: "#243A5A",
              borderColor: "#243A5A",
            }}
          >
            {isLoading ? <Spin size="small" /> : "Save Changes"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
