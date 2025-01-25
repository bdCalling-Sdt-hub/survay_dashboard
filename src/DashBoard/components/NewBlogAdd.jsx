/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
import { Button, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";

function NewBlogAdd({ setShowEditBlogModal }) {
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
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
      handleInputChange("image", e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!blogData.title || !blogData.category || !blogData.content) {
      alert("Please fill out all fields.");
      return;
    }
    console.log("Blog data submitted:", blogData);
    setShowEditBlogModal(false);
  };
  const blogConntent = useMemo(() => {
    return (
      <JoditEditor
        value={blogData.content}
        onBlur={(newContent) => handleInputChange("content", newContent)}
        config={{
          readonly: false,
          toolbarSticky: false,
          height: 500,
          width: "100%",
        }}
      />
    );
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div className="flex w-full flex-col gap-6 items-start">
        {/* Blog Title */}
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Blog Title
        </label>
        <Input
          id="title"
          value={blogData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Enter the title of your blog"
        />

        {/* Blog Category */}
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Blog Hashtag
        </label>
        <Input
          id="category"
          value={blogData.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
          placeholder="Enter the category of your blog (e.g., Technology, Health)"
        />

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Blog Image
          </label>
          {blogData.image && (
            <img
              src={blogData.image}
              alt="Preview"
              className="w-[400px] h-[300px] object-cover rounded-md"
            />
          )}
          <Upload
            beforeUpload={() => false}
            onChange={handleImageUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload New Image</Button>
          </Upload>
        </div>

        {/* Blog Content Editor */}
        <label
          htmlFor="content"
          className="block w-full text-sm font-medium text-gray-700"
        >
          Blog Content
        </label>

        <div className="w-full">{blogConntent}</div>
        {/* Save and Cancel Buttons */}
        <div className="flex gap-4 mt-4">
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-md"
            type="primary"
            onClick={handleSubmit}
          >
            Add Blog
          </Button>
          <Button
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md"
            onClick={() => setShowEditBlogModal(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewBlogAdd;
