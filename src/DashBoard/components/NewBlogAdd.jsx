import { useMemo, useState } from "react";
import { Button, Form, Input, Upload, message, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import { usePostNewBlogMutation } from "../../redux/services/blogApis";

function NewBlogAdd({ setShowEditBlogModal }) {
  const [newBlogPost, { isLoading }] = usePostNewBlogMutation();
  const [form] = Form.useForm();
  const [blogData, setBlogData] = useState({
    title: "",
    hashtag: "",
    blog_image: null,
    description: "",
  });

  const handleInputChange = (key, value) => {
    setBlogData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      handleInputChange("blog_image", file);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("hashtag", values.hashtag);
      formData.append("description", blogData.description);
      if (blogData.blog_image) {
        formData.append("blog_image", blogData.blog_image);
      }

      await newBlogPost(formData);
      message.success("Blog added successfully!");
      setShowEditBlogModal(false);
    } catch (error) {
      message.error("Please fill out all fields correctly.");
    }
  };

  const contentText = useMemo(() => {
    return (
      <JoditEditor
        value={blogData.description}
        onBlur={(newContent) => handleInputChange("description", newContent)}
        config={{ readonly: false, height: 300 }}
      />
    );
  }, []);
  return (
    <Card title="Add New Blog" bordered={false} className="w-full mx-auto mt-6">
      <Form requiredMark={false} form={form} layout="vertical">
        {/* Blog Title */}
        <Form.Item
          label="Blog Title"
          name="title"
          rules={[{ required: true, message: "Please enter the blog title" }]}
        >
          <Input
            placeholder="Enter blog title"
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </Form.Item>

        {/* Blog Hashtag */}
        <Form.Item
          label="Blog Hashtag"
          name="hashtag"
          rules={[{ required: true, message: "Please enter a hashtag" }]}
        >
          <Input
            placeholder="Enter blog hashtag"
            onChange={(e) => handleInputChange("hashtag", e.target.value)}
          />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          label="Blog Image"
          name="blog_image"
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            beforeUpload={() => false}
            showUploadList={false}
            onChange={handleImageUpload}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {blogData.blog_image && (
            <img
              src={URL.createObjectURL(blogData.blog_image)}
              alt="Preview"
              className="mt-2 w-full max-h-60 object-cover rounded-md"
            />
          )}
        </Form.Item>

        {/* Blog Description */}
        <Form.Item
          label="Blog Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          {contentText}
        </Form.Item>

        {/* Submit and Cancel Buttons */}
        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={isLoading}
            className="mr-2"
          >
            Add Blog
          </Button>
          <Button onClick={() => setShowEditBlogModal(false)}>Cancel</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default NewBlogAdd;
