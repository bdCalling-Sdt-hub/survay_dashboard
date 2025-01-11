import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { FaEye, FaRegCalendarCheck, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const StoryTable = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("notApproved"); // Track active filter

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
            }
        });
    };

    const handleFilter = (isApproved) => {
        const filtered = data.filter((item) => item.approve === isApproved);
        setFilteredData(filtered);
        setActiveFilter(isApproved ? "approved" : "notApproved");
    };

    const approvedHandle = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to approve this item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Approved!",
                    text: "The item has been successfully approved.",
                    icon: "success",
                });
            }
        });
    };

    const columns = [
        {
            title: "SL No",
            key: "index",
            width: 50,
            render: (_, __, index) => <span>{index + 1}</span>,
        },
        {
            title: "Story Media",
            dataIndex: "bannerImage",
            key: "bannerImage",
            width: 120,
            render: (src) => (
                <img
                    src={src}
                    alt="Story"
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
            title: "Story Name",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Story Description",
            dataIndex: "description",
            key: "description",
            render: (description) =>
                description && description.length > 50
                    ? description.substring(0, 50) + "..."
                    : description || "No description available",
        },
        {
            title: "Publish Date",
            dataIndex: "date",
            key: "date",
            sorter: (a, b) => new Date(a.date) - new Date(b.date), // Sorting logic
            render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
        },
        {
            title: "Action",
            key: "action",
            width: 150,
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <FaEye
                        className="text-white cursor-pointer bg-[#00B0F2] w-8 p-2 hover:opacity-75 h-8 rounded-md"
                    />
                    {!record.approve && (
                        <FaRegCalendarCheck
                            onClick={() => approvedHandle()}
                            className="text-white cursor-pointer w-8 p-2 hover:opacity-75 h-8 rounded-md bg-[#2d5882]"
                        />
                    )}
                    <FaRegTrashAlt
                        onClick={() => handleDelete()}
                        className="text-white cursor-pointer w-8 p-2 hover:opacity-75 h-8 rounded-md bg-red-600"
                    />
                </div>
            ),
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/story.json");
                setData(response.data);
                setFilteredData(response.data.filter((item) => item.approve === false));
            } catch (error) {
                console.error("Error fetching story data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
                <button
                    onClick={() => handleFilter(false)}
                    className={`${activeFilter !== "approved" ? 'text-[#00B0F2] border-b-2 border-[#00B0F2]' : ''}`}
                >
                    Requested Stories
                </button>
                <button
                    onClick={() => handleFilter(true)}
                    className={`${activeFilter !== "approved" ? '' : 'text-[#00B0F2] border-b-2 border-[#00B0F2]'}`}
                >
                    Approved Stories
                </button>
            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                loading={loading}
                pagination={{
                    pageSize: 6,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`,
                }}
                rowKey="id"
            />
        </div>
    );
};

export default StoryTable;
