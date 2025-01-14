import { Modal, Button, Input, Upload } from 'antd';
import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import JoditEditor from 'jodit-react';

function BlogCustomize({ selectedBlog, onDeleteBlog, onEditBlog }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBlog, setEditedBlog] = useState(null);


    useEffect(() => {
        setEditedBlog(selectedBlog);
    }, [selectedBlog]);


    const handleInputChange = (key, value) => {
        setEditedBlog({ ...editedBlog, [key]: value });
    };


    const handleImageUpload = ({ file }) => {
        const reader = new FileReader();
        reader.onload = () => {
            setEditedBlog({ ...editedBlog, image: reader.result });
        };
        reader.readAsDataURL(file);
    };


    const handleEditSubmit = () => {
        console.log("Updated Blog Data:", editedBlog); // Log the updated data
        onEditBlog(editedBlog); // Call the parent function to handle the edited blog
        setIsEditing(false); // Close the editing mode
    };


    return (
        <div>
            {editedBlog && (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                    {isEditing ? (
                        <div className="flex flex-col gap-6 items-start">

                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 -mb-3">
                                Blog Title
                            </label>
                            <Input
                                id="title"
                                value={editedBlog.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="Enter the title of your blog"
                                className="mb-2"
                            />
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 -mb-3">
                                Blog Category
                            </label>
                            <Input
                                id="category"
                                value={editedBlog.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                placeholder="Enter the category of your blog (e.g., Technology, Health)"
                                className="mb-2"
                            />

                            <div className="flex flex-col gap-2">
                                <p>Current Image:</p>
                                <img
                                    src={editedBlog.image}
                                    alt="Preview"
                                    className='w-[400px] h-[300px] object-cover'
                                />
                                <Upload
                                    beforeUpload={() => false}
                                    onChange={handleImageUpload}
                                    showUploadList={false}
                                >
                                    <Button icon={<UploadOutlined />}>Upload New Image</Button>
                                </Upload>
                            </div>


                            <JoditEditor
                            
                                value={editedBlog.content.join('\n')}
                                onBlur={(newContent) =>
                                    handleInputChange('content', newContent.split('\n'))
                                }
                                config={{
                                    readonly: false,
                                    toolbarSticky: false,
                                    height: 500,
                                    width: '100%',
                                }}
                                className="mb-2"
                            />

                            <Input
                                value={editedBlog.date}
                                onChange={(e) => handleInputChange('date', e.target.value)}
                                placeholder="Date"
                                className="mb-2"
                            />

                            {/* Image Upload */}


                            <div className="flex gap-2">
                                <Button
                                    className="bg-[#f0f8ff] hover:opacity-75 border-[1px] border-[#00b0f2] text-[#00b0f2] px-4 py-2 rounded-md"
                                    type="primary" onClick={handleEditSubmit}>
                                    Save Changes
                                </Button>
                                {isEditing && (
                                    <Button
                                        className="hover:bg-[#f0f8ff] hover:border-[1px] hover:border-[#00b0f2] hover:text-[#00b0f2] bg-[#00b0f2]  border-[1px] border-[#00b0f2] text-white px-4 py-2 rounded-md"
                                        onClick={() => setIsEditing(false)}>Cancel</Button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6 items-start">
                            <p className="text-xs sm:text-sm bg-blue-200 text-blue-800 px-3 py-1 rounded-full">
                                #{editedBlog.category}
                            </p>

                            <h1 className="text-[#1D3557] text-2xl sm:text-4xl lg:text-5xl font-bold leading-snug">
                                {editedBlog.title}
                            </h1>

                            <p className="text-gray-600 text-sm sm:text-base">
                                <strong>Date:</strong> {editedBlog.date}
                            </p>

                            <img
                                src={editedBlog.image}
                                alt={editedBlog.title}
                                className="w-full max-h-[400px] sm:max-h-[600px] object-cover rounded-lg shadow-lg"
                            />

                            <div className="prose prose-sm sm:prose-base lg:prose-lg text-gray-800 mt-8">
                                {editedBlog.content.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end mt-4 gap-2">
                        {!isEditing && (
                            <div className="flex justify-end mt-6">
                                <div className=" flex gap-2">
                                    <button
                                        className="bg-[#f0f8ff] hover:opacity-75 border-[1px] border-[#00b0f2] text-[#00b0f2] px-4 py-2 rounded-md"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit Blog
                                    </button>
                                    <button
                                        className="hover:bg-[#f0f8ff] hover:border-[1px] hover:border-[#00b0f2] hover:text-[#00b0f2] bg-[#00b0f2]  border-[1px] border-[#00b0f2] text-white px-4 py-2 rounded-md"
                                        onClick={() => onDeleteBlog(selectedBlog.id)}
                                    >
                                        Delete Blog
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            )}
        </div>
    );
}

export default BlogCustomize;


