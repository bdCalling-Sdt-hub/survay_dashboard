import { Modal, Button, Input, Upload } from 'antd';
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';

function BlogCustomize({ selectedBlog, showBlogModal, setShowBlogModal, onDeleteBlog, onEditBlog }) {
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
    const [editedBlog, setEditedBlog] = useState(selectedBlog); // State to store edited blog

    // Handle input change for editing
    const handleInputChange = (key, value) => {
        setEditedBlog({ ...editedBlog, [key]: value });
    };

    const handleImageUpload = ({ file }) => {
        const reader = new FileReader();
        reader.onload = () => {
            setEditedBlog({ ...editedBlog, image: reader.result }); // Update image with Base64 string
        };
        reader.readAsDataURL(file);
    };

    const handleEditSubmit = () => {
        onEditBlog(editedBlog); // Call the parent function to update the blog
        setIsEditing(false);
    };

    return (
        <div>
            <Modal
                open={showBlogModal}
                onCancel={() => setShowBlogModal(false)}
                footer={null}
                width={800}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                    {isEditing ? (
                        <div className="flex flex-col gap-6 items-start">
                            <Input
                                value={editedBlog.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                placeholder="Category"
                                className="mb-2"
                            />
                            <Input
                                value={editedBlog.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="Title"
                                className="mb-2"
                            />
                            <Input.TextArea
                                value={editedBlog.content.join('\n')}
                                onChange={(e) =>
                                    handleInputChange('content', e.target.value.split('\n'))
                                }
                                rows={5}
                                placeholder="Content"
                                className="mb-2"
                            />
                            <Input
                                value={editedBlog.date}
                                onChange={(e) => handleInputChange('date', e.target.value)}
                                placeholder="Date"
                                className="mb-2"
                            />

                            {/* Image Upload */}
                            <div className="flex flex-col gap-2">
                                <p>Current Image:</p>
                                <img
                                    src={editedBlog.image}
                                    alt="Preview"
                                    style={{
                                        maxWidth: '200px',
                                        borderRadius: '8px',
                                        marginBottom: '10px',
                                    }}
                                />
                                <Upload
                                    beforeUpload={() => false} // Prevent auto upload
                                    onChange={handleImageUpload}
                                    showUploadList={false}
                                >
                                    <Button icon={<UploadOutlined />}>Upload New Image</Button>
                                </Upload>
                            </div>

                            <Button type="primary" onClick={handleEditSubmit}>
                                Save Changes
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6 items-start">
                            <p className="text-xs sm:text-sm bg-blue-200 text-blue-800 px-3 py-1 rounded-full">
                                #{selectedBlog.category}
                            </p>

                            <h1 className="text-[#1D3557] text-2xl sm:text-4xl lg:text-5xl font-bold leading-snug">
                                {selectedBlog.title}
                            </h1>

                            <p className="text-gray-600 text-sm sm:text-base">
                                <strong>Date:</strong> {selectedBlog.date}
                            </p>

                            <img
                                src={selectedBlog.image}
                                alt={selectedBlog.title}
                                className="w-full max-h-[400px] sm:max-h-[600px] object-cover rounded-lg shadow-lg"
                            />

                            <div className="prose prose-sm sm:prose-base lg:prose-lg text-gray-800 mt-8">
                                {selectedBlog.content.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end mt-4 gap-2">
                        {!isEditing && (
                            <>
                                <Button
                                    type="primary"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Blog
                                </Button>
                                <Button
                                    type="danger"
                                    onClick={() => onDeleteBlog(selectedBlog.id)}
                                >
                                    Delete Blog
                                </Button>
                            </>
                        )}
                        {isEditing && (
                            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default BlogCustomize;
