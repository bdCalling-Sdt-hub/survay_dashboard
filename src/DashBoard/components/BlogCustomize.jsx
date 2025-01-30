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
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  useEffect(() => {
    if (selectedBlog) {
      setEditedBlog({ ...selectedBlog });
    }
  }, [selectedBlog]);

  const handleInputChange = (key, value) => {
    setEditedBlog((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (info) => {
    setImageLoading(true);
    const uploadedImage = info.file.originFileObj || info.file;

    if (!(uploadedImage instanceof File)) {
      message.error("Invalid file type. Please upload a valid image.");
      setImageLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedImage);

    try {
      const response = await fetch("https://your-api.com/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result?.imageUrl) {
        setEditedBlog((prev) => ({ ...prev, blog_image: result.imageUrl }));
        message.success("Image uploaded successfully!");
      } else {
        throw new Error(result?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Image upload failed. Please try again.");
    } finally {
      setImageLoading(false);
    }
  };

  const handleEditSubmit = async () => {
    if (!editedBlog) return;
    console.log(editedBlog);

    try {
      const updateData = {
        blog_image: editedBlog.blog_image,
        description: editedBlog.description,
        hashtag: editedBlog.hashtag,
        title: editedBlog.title,
      };
      await updateBlog({ id: editedBlog._id, data: updateData }).unwrap();
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
              imageSrc={imageUrl(editedBlog?.blog_image)}
              name={editedBlog?.title}
            />
            <Upload
              beforeUpload={() => false}
              onChange={handleImageUpload}
              showUploadList={false}
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
            <div className="flex gap-2">
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
        </div>
      )}
    </div>
  );
}

export default BlogCustomize;
