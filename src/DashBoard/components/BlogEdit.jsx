// /* eslint-disable react/prop-types */
// import { Button, Input, Upload } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import JoditEditor from "jodit-react";
// import { useState, useEffect, useRef } from "react";
// import { imageUrl } from "../../utils/server";

import { Button, Card, Form, Input, message, Upload } from "antd";
import JoditEditor from "jodit-react";
import { useMemo, useState } from "react";
import {
  useSingleBlogGetMutation,
  useUpdateBlogMutation,
} from "../../redux/services/blogApis";

// function BlogEdit({ selectedBlog, setShowEditBlogModal }) {
//   const editorRef = useRef(null);

//   const [editedBlog, setEditedBlog] = useState({
//     blogDate: "",
//     blogDescription: "",
//     blogHash: "",
//     blogId: "",
//     blogImage: "",
//     blogTitle: "",
//   });
//   console.log(editedBlog.blogImage);

//   useEffect(() => {
//     if (selectedBlog) {
//       setEditedBlog({ ...selectedBlog });
//     }
//   }, [selectedBlog]);

//   const handleInputChange = (key, value) => {
//     setEditedBlog((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleImageUpload = ({ file }) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       setEditedBlog((prev) => ({ ...prev, blogImage: reader.result }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleEditSubmit = () => {
//     console.log("Updated Blog Data:", editedBlog);
//     // Submit logic here
//   };

//   if (!editedBlog.blogTitle) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
//       <div className="flex flex-col gap-6 items-start">
//         {/* Blog Title */}
//         <label
//           htmlFor="title"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Blog Title
//         </label>
//         <Input
//           id="title"
//           value={editedBlog.blogTitle}
//           onChange={(e) => handleInputChange("blogTitle", e.target.value)}
//           placeholder="Enter the title of your blog"
//         />

//         {/* Blog Hashtag */}
//         <label
//           htmlFor="blogHash"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Blog Hashtag
//         </label>
//         <Input
//           id="blogHash"
//           value={editedBlog.blogHash}
//           onChange={(e) => handleInputChange("blogHash", e.target.value)}
//           placeholder="Enter hashtags for your blog (e.g., #Tech, #Health)"
//         />

//         {/* Blog Image Upload */}
//         <div className="flex flex-col gap-2">
//           <p>Current Image:</p>
//           {editedBlog.blogImage && (
//             <img
//               src={imageUrl(editedBlog.blogImage)}
//               alt="Preview"
//               className="w-[400px] h-[300px] object-cover"
//             />
//           )}
//           <Upload
//             beforeUpload={() => false}
//             onChange={handleImageUpload}
//             showUploadList={false}
//           >
//             <Button icon={<UploadOutlined />}>Upload New Image</Button>
//           </Upload>
//         </div>

//         {/* Blog Description */}
//         <label className="block text-sm font-medium text-gray-700">
//           Blog Content
//         </label>
//         <div className="w-full">
//           <JoditEditor
//             ref={editorRef}
//             value={editedBlog.blogDescription}
//             onBlur={(newContent) =>
//               handleInputChange("blogDescription", newContent)
//             }
//             config={{
//               readonly: false,
//               toolbarSticky: false,
//               height: 500,
//               width: "100%",
//             }}
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-2">
//           <Button
//             type="primary"
//             className="bg-blue-500 text-white"
//             onClick={handleEditSubmit}
//           >
//             Save Changes
//           </Button>
//           <Button
//             className="border-blue-500 text-blue-500"
//             onClick={() => setShowEditBlogModal(false)}
//           >
//             Cancel
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlogEdit;
import { UploadOutlined } from "@ant-design/icons";
function BlogEdit({ selectedBlog }) {
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

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

      await updateBlog(formData);
      message.success("Blog added successfully!");
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
            loading={isUpdating}
            className="mr-2"
          >
            Update Blog
          </Button>
          {/* <Button onClick={() => setShowEditBlogModal(false)}>Cancel</Button> */}
        </Form.Item>
      </Form>
    </Card>
  );
}

export default BlogEdit;
