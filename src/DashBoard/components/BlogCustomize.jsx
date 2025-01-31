import { Button, Input, message, Upload } from "antd";
import { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import { imageUrl, stripHtmlTags } from "../../utils/server";
import { useUpdateBlogMutation } from "../../redux/services/blogApis";
import UsernameImage from "../../utils/UsernameImage";

function BlogCustomize({ selectedBlog, onDeleteBlog }) {
  const [isEditing, setIsEditing] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [editedBlog, setEditedBlog] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  useEffect(() => {
    if (selectedBlog) {
      setEditedBlog({ ...selectedBlog });
      setFileList(
        selectedBlog.blog_image
          ? [
              {
                uid: "-1",
                name: "blog_image.jpg",
                status: "done",
                url: imageUrl(selectedBlog.blog_image),
              },
            ]
          : []
      );
    }
  }, [selectedBlog]);

  const handleInputChange = (key, value) => {
    setEditedBlog((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleEditSubmit = async () => {
    if (!editedBlog) return;

    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          title: editedBlog.title,
          hashtag: editedBlog.hashtag,
          description: editedBlog.description,
        })
      );

      if (fileList.length > 0) {
        formData.append("blog_image", fileList[0].originFileObj);
      }

      await updateBlog({ id: editedBlog._id, data: formData }).unwrap();

      message.success("Blog updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      message.error("Failed to update blog.");
    }
  };

  if (!editedBlog) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      {isEditing ? (
        <div className="flex flex-col gap-6 items-start">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Blog Title
          </label>
          <Input
            id="title"
            value={editedBlog.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter blog title"
          />

          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <Input
            id="category"
            value={editedBlog.hashtag || ""}
            onChange={(e) => handleInputChange("hashtag", e.target.value)}
            placeholder="Enter blog category"
          />

          <div className="flex flex-col gap-2">
            <p>Current Image:</p>
            <UsernameImage
              imageSrc={
                fileList.length > 0
                  ? fileList[0].url
                  : imageUrl(editedBlog.blog_image)
              }
              name={editedBlog?.title}
            />
            <Upload
              beforeUpload={() => false}
              onChange={handleImageUpload}
              fileList={fileList}
              showUploadList={true}
              listType="picture"
            >
              <Button icon={<UploadOutlined />} loading={imageLoading}>
                {imageLoading ? "Uploading..." : "Upload New Image"}
              </Button>
            </Upload>
          </div>

          <div className="w-full">
            <JoditEditor
              value={editedBlog.description || ""}
              onBlur={(newContent) =>
                handleInputChange("description", newContent)
              }
              config={{
                readonly: false,
                toolbarSticky: false,
                height: 500,
                width: "100%",
              }}
              className="mb-2"
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="primary"
              onClick={handleEditSubmit}
              loading={isUpdating}
            >
              Save Changes
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 items-start">
          <p className="text-xs sm:text-sm bg-blue-200 text-blue-800 px-3 py-1 rounded-full">
            #{editedBlog.hashtag}
          </p>
          <h1 className="text-[#1D3557] text-2xl sm:text-4xl lg:text-5xl font-bold">
            {editedBlog.title}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            <strong>Date:</strong> {editedBlog.createdAt || "N/A"}
          </p>
          <img
            src={imageUrl(editedBlog.blog_image)}
            alt={editedBlog.title}
            className="w-[200px] sm:max-h-[300px] object-cover rounded-lg shadow-lg"
          />
          <p className="text-gray-600 text-sm sm:text-base">
            <strong>Description:</strong>{" "}
            {stripHtmlTags(editedBlog.description) || "N/A"}
          </p>
          <div className="flex justify-end mt-4 gap-2">
            <Button type="default" onClick={() => setIsEditing(true)}>
              Edit Blog
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => onDeleteBlog(editedBlog._id)}
            >
              Delete Blog
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogCustomize;
// import { Form, Input, Upload, Button, message, Spin } from "antd";
// import { FaImage } from "react-icons/fa";
// import { LoadingOutlined } from "@ant-design/icons";
// import { useState } from "react";
// import { useUpdateBlogMutation } from "../../redux/services/blogApis";

// const BlogCustomize = ({ closeModal }) => {
//   const [form] = Form.useForm();
//   const [updateData, { isLoading: updating }] = useUpdateBlogMutation();
//   const [file, setFile] = useState(null);
//   const [fileList, setFileList] = useState([]);

//   const handleFileChange = ({ fileList }) => {
//     setFileList(fileList);
//     setFile(fileList.length ? fileList[0].originFileObj : null);
//   };

//   const onFinish = async (values) => {
//     if (!file) {
//       message.error("Please upload a category image");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", values.name);
//     formData.append("category_image", file);

//     try {
//       await updateData(formData).unwrap();
//       form.resetFields();
//       setFile(null);
//       setFileList([]);
//       message.success("Category added successfully");
//       closeModal();
//     } catch (error) {
//       message.error("Failed to add category. Please try again.");
//     }
//   };

//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       onFinish={onFinish}
//       className="bg-[var(--black-200)] p-3 rounded-md"
//     >
//       <p className="text-xl text-[var(--white-600)] text-center">
//         Add New Category
//       </p>

//       <Form.Item
//         label={<span className="text-[var(--white-600)]">Category Name</span>}
//         name="name"
//         rules={[{ required: true, message: "Please input category name" }]}
//       >
//         <Input className="bg-[var(--black-600)] p-2 w-full outline-none focus:bg-[var(--black-700)] hover:bg-[var(--black-700)] border-none h-11 text-[var(--white-600)]" />
//       </Form.Item>

//       <Form.Item
//         label={<span className="text-[var(--white-600)]">Category Image</span>}
//         rules={[{ required: true, message: "Please upload a category image" }]}
//       >
//         <Upload
//           beforeUpload={() => false}
//           onChange={handleFileChange}
//           listType="picture-card"
//           maxCount={1}
//           accept="image/*"
//           fileList={fileList}
//         >
//           <div className="center-center flex-col">
//             <FaImage className="text-[var(--white-600)]" />
//             <p className="text-[var(--white-600)]">Upload Image</p>
//           </div>
//         </Upload>
//       </Form.Item>

//       <div className="center-center mt-10 flex justify-between">
//         <Button
//           onClick={() => {
//             closeModal();
//             form.resetFields();
//             setFile(null);
//             setFileList([]);
//           }}
//           className="border border-[var(--gray-600)] text-[var(--orange-600)]"
//         >
//           Cancel
//         </Button>
//         <Button
//           type="primary"
//           htmlType="submit"
//           loading={updating}
//           className="bg-[var(--orange-600)] border-none text-[var(--white-600)]"
//         >
//           {updating ? (
//             <Spin indicator={<LoadingOutlined spin />} size="small" />
//           ) : (
//             "Update"
//           )}
//         </Button>
//       </div>
//     </Form>
//   );
// };

// export default BlogCustomize;
