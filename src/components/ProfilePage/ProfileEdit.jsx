import { Button, Form, message, Spin } from "antd";
import { useSuperAdminProfileUpdateMutation } from "../../redux/services/userApis";

const ProfileEdit = ({ image, data }) => {
  const [form] = Form.useForm();
  const [setProfileUpdate, { isLoading: isProfileUpdate }] =
    useSuperAdminProfileUpdateMutation();

  const onFinish = async (values) => {
    const updateData = {
      name: values.name,
      address: values.address,
    };

    const formData = new FormData();

    Object.keys(updateData).forEach((key) => {
      if (updateData[key]) {
        formData.append(key, updateData[key]);
      }
    });

    if (image) {
      formData.append("profile_image", image);
    }

    try {
      const res = await setProfileUpdate(formData);

      if (res?.data?.success) {
        message.success("Profile updated successfully!");

        // Update the form with new values after the successful update
        form.setFieldsValue({
          name: updateData.name,
          address: updateData.address,
        });
      } else {
        message.error(res?.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      message.error("An error occurred while updating the profile.");
    }
  };

  return (
    <Form
      requiredMark={false}
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{
        name: data?.name || "",
        email: data?.email || "",
        username: data?.username || "",
      }}
    >
      <Form.Item name="name" label="Name">
        <input
          style={{
            width: "100%",
            height: 40,
            border: "1px solid black",
            borderRadius: "5px",
            color: "#111",
            backgroundColor: "#fff",
            outline: "none",
          }}
          placeholder="Name"
          className="bg-[var(--black-600)] p-2 w-full outline-none focus:bg-[var(--black-700)] hover:bg-[var(--black-700)] active:bg-[var(--black-700)] border-none h-11 text-[var(--white-600)]"
        />
      </Form.Item>

      <Form.Item name="email" label="Email">
        <input
          style={{
            width: "100%",
            height: 40,
            border: "1px solid black",
            borderRadius: "5px",
            color: "#111",
            backgroundColor: "#fff",
            outline: "none",
          }}
          disabled
          type="email"
          placeholder="Email"
          className="bg-[var(--black-600)] cursor-not-allowed p-2 w-full outline-none focus:bg-[var(--black-700)] hover:bg-[var(--black-700)] active:bg-[var(--black-700)] border-none h-11 text-[var(--white-600)]"
        />
      </Form.Item>

      <Form.Item name="username" label="User Name">
        <input
          style={{
            width: "100%",
            height: 40,
            border: "1px solid black",
            borderRadius: "5px",
            color: "#111",
            backgroundColor: "#fff",
            outline: "none",
          }}
          placeholder="User Name"
          disabled
          className="bg-[var(--black-600)]  cursor-not-allowed p-2 w-full outline-none focus:bg-[var(--black-700)] hover:bg-[var(--black-700)] active:bg-[var(--black-700)] border-none h-11 text-[var(--white-600)]"
        />
      </Form.Item>

      <Button
        htmlType="submit"
        disabled={isProfileUpdate}
        style={{
          width: "200px",
          justifyContent: "center",
        }}
        className={`sidebar-button-orange mx-auto`}
      >
        {isProfileUpdate ? <Spin /> : "Update Profile"}
      </Button>
    </Form>
  );
};

export default ProfileEdit;
