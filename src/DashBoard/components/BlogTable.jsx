import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { FaEye, FaEdit, FaTrash, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { MdMessage } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import Swal from "sweetalert2";

const BlogTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    const columns = [
        {
            title: "SL No",
            dataIndex: "id",
            key: "id",
            width: 50,
            render: (text) => <span>{text.toString().padStart(2, "0")}</span>,
        },
        {
            title: "Blog Media",
            dataIndex: "image",
            key: "image",
            width: 120,
            render: (src) => (
                <img
                    src={src}
                    alt="Blog"
                    style={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: "5px",
                    }}
                />
            ),
        },
        {
            title: "Blog Hashtag",
            dataIndex: "category",
            key: "category",
            render: (text) => (
                <span style={{ color: "#2d5882", fontWeight: "bold" }}>
                    #{text.replace(/\s+/g, "")}
                </span>
            ),
        },
        {
            title: "Blog Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Blog Description",
            dataIndex: "content",
            key: "content",
            render: (content) =>
                content && content.length > 0
                    ? content[0].substring(0, 50) + "..."
                    : "No description available",
        },
        {
            title: "Publish Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Action",
            key: "action",
            width: 120,
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <FaEye className="text-white  hover:opacity-75 bg-[#00B0F2] w-8 p-2 
                     h-8 rounded-md" />
                    <MdModeEdit className="text-white  hover:opacity-75 w-8 p-2 
                     h-8 rounded-md bg-[#2d5882]" />
                    <FaRegTrashAlt onClick={() => handleDelete()} className="text-white  hover:opacity-75 w-8 p-2 
                     h-8 rounded-md bg-red-600" />

                </div>
            ),
        },
    ];

    // Fetching data using axios
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await axios.get("/blogs.json");
                setData(result.data);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{
                    pageSize: 10,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`,
                }}
                rowKey="id"
            />
        </div>
    );
};

export default BlogTable;
