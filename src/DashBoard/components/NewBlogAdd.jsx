import { useState, useMemo } from "react";
import { Button, Form, Input, Upload, message, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import { usePostNewBlogMutation } from "../../redux/services/blogApis";

function NewBlogAdd({ setShowEditBlogModal }) {
  const [newBlogPost, { isLoading }] = usePostNewBlogMutation();
  const [form] = Form.useForm();
  const [blogText, setBlogText] = useState("");
  const [blogImage, setBlogImage] = useState(null);

  const handleImageUpload = ({ file }) => {
    setBlogImage(file);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (!values.hashtag.startsWith("#")) {
        message.error("Hashtag must start with #");
        return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("hashtag", values.hashtag);
      formData.append("description", blogText);
      if (blogImage) {
        formData.append("blog_image", blogImage);
      }

      await newBlogPost(formData);
      message.success("Blog added successfully!");
      setShowEditBlogModal(false);
    } catch (error) {
      message.error("Please fill out all fields correctly.");
    }
  };

  const contentEditor = useMemo(
    () => (
      <JoditEditor
        value={blogText}
        onBlur={(newContent) => setBlogText(newContent)}
        config={{ readonly: false, toolbarSticky: false, height: 500 }}
      />
    ),
    [blogText]
  );

  return (
    <Card title="Add New Blog" bordered={false} className="w-full mx-auto mt-6">
      <Form requiredMark={false} form={form} layout="vertical">
        <Form.Item
          label="Blog Title"
          name="title"
          rules={[{ required: true, message: "Please enter the blog title" }]}
        >
          <Input placeholder="Enter blog title" />
        </Form.Item>

        <Form.Item
          label="Blog Hashtag"
          name="hashtag"
          rules={[{ required: true, message: "Please enter a hashtag" }]}
        >
          <Input placeholder="Enter blog hashtag (e.g., #example)" />
        </Form.Item>

        <Form.Item label="Blog Image" name="blog_image">
          <Upload
            beforeUpload={() => false}
            showUploadList={false}
            onChange={handleImageUpload}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {blogImage && (
            <img
              src={URL.createObjectURL(blogImage)}
              alt="Preview"
              className="mt-2 w-full max-h-60 object-cover rounded-md"
            />
          )}
        </Form.Item>

        <div className="w-full">
          {contentEditor}
        </div>

        <Form.Item className="mt-4">
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
