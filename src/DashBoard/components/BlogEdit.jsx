/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import JoditEditor from "jodit-react";
import { imageUrl } from "../../utils/server";
import { useUpdateBlogMutation } from "../../redux/services/blogApis";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function BlogEdit({ selectedBlog }) {
  const [editedBlog, setEditedBlog] = useState({
    id: "",
    title: "",
    hashtag: "",
    description: "",
    blog_image: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [updateBlog] = useUpdateBlogMutation();
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const handleChange = (info) => {
    if (info.file) {
      const file = info.fileList[0].originFileObj;
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectedBlog) {
      setEditedBlog({
        id: selectedBlog?._id,
        title: selectedBlog?.title,
        hashtag: selectedBlog?.hashtag,
        description: selectedBlog?.description,
        blog_image: selectedBlog?.blog_image,
      });

      setImagePreview(selectedBlog?.blog_image);
      form.setFieldsValue({
        title: selectedBlog?.title,
        hashtag: selectedBlog?.hashtag,
        description: selectedBlog?.description,
      });
    }
  }, [selectedBlog, form]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("hashtag", values.hashtag);
      formData.append("description", values.description);
      if (image) {
        formData.append("blog_image", image);
      }

      await updateBlog({ id: editedBlog.id, data: formData }).unwrap();
      message.success("Blog updated successfully!");
    } catch (error) {
      console.error("Update error:", error?.data?.message);
      message.error("Failed to update blog.",error?.data?.message);
    }
  };
  const content = useMemo(() => {
    return (
      <JoditEditor
        value={editedBlog?.description}
        onBlur={(newContent) =>
          setEditedBlog((prev) => ({ ...prev, description: newContent }))
        }
        config={{
          readonly: false,
          toolbarSticky: false,
          height: 300,
        }}
      />
    );
  }, []);

  const profileImage = image
    ? URL.createObjectURL(image)
    : selectedBlog?.blog_image
    ? imageUrl(selectedBlog?.blog_image)
    : "/path/to/default-image.jpg";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>

      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the blog title!" }]}
        >
          <Input placeholder="Enter blog title" onChange={handleInputChange} />
        </Form.Item>

        <Form.Item
          label="Hashtag"
          name="hashtag"
          rules={[
            { required: true, message: "Please input the blog hashtag!" },
          ]}
        >
          <Input
            placeholder="Enter blog hashtag"
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label="Blog Image">
          <Upload
            name="blog_image"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleChange}
          >
            {imagePreview ? (
              <img src={profileImage} alt="blog" />
            ) : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input the blog description!" },
          ]}
        >
          {content}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default BlogEdit;
