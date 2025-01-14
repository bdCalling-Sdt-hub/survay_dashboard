import { Button, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import JoditEditor from 'jodit-react';
import React, { useState, useEffect } from 'react';

function BlogEdit({ selectedBlog, setShowEditBlogModal }) {
    const [editedBlog, setEditedBlog] = useState(null);

    useEffect(() => {
        if (selectedBlog) {
            setEditedBlog({ ...selectedBlog });
        }
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
        console.log('Updated Blog Data:', editedBlog);
    };

    if (!editedBlog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="flex flex-col gap-6 items-start">
                {/* Blog Title */}
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Blog Title
                </label>
                <Input
                    id="title"
                    value={editedBlog.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter the title of your blog"
                />

                {/* Blog Category */}
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Blog Category
                </label>
                <Input
                    id="category"
                    value={editedBlog.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="Enter the category of your blog (e.g., Technology, Health)"
                />

                {/* Image Upload */}
                <div className="flex flex-col gap-2">
                    <p>Current Image:</p>
                    <img
                        src={editedBlog.image}
                        alt="Preview"
                        className="w-[400px] h-[300px] object-cover"
                    />
                    <Upload
                        beforeUpload={() => false}
                        onChange={handleImageUpload}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}>Upload New Image</Button>
                    </Upload>
                </div>

                {/* Blog Content Editor */}
                <JoditEditor
                    value={editedBlog.content?.join('\n') || ''}
                    onBlur={(newContent) =>
                        handleInputChange('content', newContent.split('\n'))
                    }
                    config={{
                        readonly: false,
                        toolbarSticky: false,
                        height: 500,
                        width: '100%',
                    }}
                />

                {/* Blog Date */}
                <Input
                    value={editedBlog.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    placeholder="Date"
                />

                {/* Save and Cancel Buttons */}
                <div className="flex gap-2">
                    <Button
                        className="bg-[#f0f8ff] hover:opacity-75 border-[1px] border-[#00b0f2] text-[#00b0f2] px-4 py-2 rounded-md"
                        type="primary"
                        onClick={handleEditSubmit}
                    >
                        Save Changes
                    </Button>
                    <Button
                        className="hover:bg-[#f0f8ff] hover:border-[1px] hover:border-[#00b0f2] hover:text-[#00b0f2] bg-[#00b0f2] border-[1px] border-[#00b0f2] text-white px-4 py-2 rounded-md"
                        onClick={() => setShowEditBlogModal(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BlogEdit;
