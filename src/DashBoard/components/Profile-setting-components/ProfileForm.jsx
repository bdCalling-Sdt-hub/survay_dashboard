import { Form, Input, Button, Typography, Spin } from "antd";
import Swal from "sweetalert2";

const ProfileForm = ({ data }) => {
  const { Title } = Typography;
  const onFinish = (values) => {
    console.log("Form values:", values);
    Swal.fire({
      title: "Save Change!",
      text: "you chnage the profile!",
      icon: "success",
    });
  };
  console.log(data);
  const { name, username, email, profile_image } = data;
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <Title level={4} style={{ textAlign: "center", marginBottom: "20px" }}>
        Edit Your Profile
      </Title>
      <Form
        requiredMark={false}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          firstName: name,
          userName: username,
          email: email,
          contactNo: "+99007007007",
        }}
      >
        {/* First Name */}
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "First name is required" }]}
        >
          <Input placeholder="Enter your first name" />
        </Form.Item>

        {/* Last Name */}
        <Form.Item
          label="User Name"
          name="userName"
          rules={[{ required: true, message: "user name is required" }]}
        >
          <Input placeholder="Enter your user name" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input disabled placeholder="Enter your email" readOnly />
        </Form.Item>

        {/* Contact No */}
        <Form.Item
          label="Contact no"
          name="contactNo"
          rules={[
            { required: true, message: "Contact number is required" },
            {
              pattern: /^\+?\d{10,15}$/,
              message: "Enter a valid contact number",
            },
          ]}
        >
          <Input placeholder="Enter your contact number" />
        </Form.Item>

        {/* Submit Button */}
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
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileForm;
