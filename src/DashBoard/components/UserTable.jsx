import React, { useState } from "react";
import { Table, Input } from "antd";
import { MdBlock, MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEye, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const UserTable = () => {
    const [searchText, setSearchText] = useState("");
    const [sortedInfo, setSortedInfo] = useState({});

    const handleSearch = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    const handleChange = (_, __, sorter) => {
        setSortedInfo(sorter);
    };

    const handleShowModal = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, block it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "block!",
                    text: "Your file has been block.",
                    icon: "success"
                });
            }
        });
    }


    const columns = [
        {
            title: "SL No",
            width: 100,
            dataIndex: "slNo",
            key: "slNo",
            fixed: "left",
        },
        {
            title: "User Info",
            width: 200,
            dataIndex: "userInfo",
            key: "userInfo",
            fixed: "left",
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <img
                        src={record.userImage}
                        alt="User"
                        className="w-10 h-10 rounded-full"
                    />
                    <span>{record.userName}</span>
                </div>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 150,
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            width: 150,
        },
        {
            title: "Signup Date",
            dataIndex: "completionDate",
            key: "completionDate",
            width: 150,
            sorter: (a, b) => new Date(a.completionDate) - new Date(b.completionDate),
            sortOrder: sortedInfo.columnKey === "completionDate" ? sortedInfo.order : null,
        },
        {
            title: "WHY Status",
            dataIndex: "status",
            key: "status",
            width: 150,
        },
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (_, record) => (

                <div className="flex items-center gap-2">
                    <FaUser
                        className="text-white w-8 p-2 cursor-pointer hover:opacity-75 h-8 rounded-md bg-blue-300"
                    />
                    <MdBlock
                        onClick={() => handleShowModal()}
                        className="text-white w-8 p-2 cursor-pointer hover:opacity-75 h-8 rounded-md bg-red-600"
                    />

                    <Link
                        to={`https://mail.google.com/mail/?view=cm&fs=1&to=${record.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MdMessage className="text-white w-8 p-2 cursor-pointer hover:opacity-75 h-8 rounded-md bg-[#2d5882]" />
                    </Link>
                </div>
            ),
        },
    ];

    const dataSource = Array.from({ length: 100 }).map((_, i) => ({
        key: i,
        slNo: i + 1,
        userName: `User ${i + 1}`,
        userImage: `https://i.pravatar.cc/150?img=${i + 1}`,
        email: `user${i + 1}@example.com`,
        address: '123 Street, Dhaka',
        phone: `123-456-${i.toString().padStart(4, "0")}`,
        status: 'yes',
        completionDate: `2025-01-${(i % 31) + 1} 12:${i % 60}:00`,
    }));

    const filteredData = dataSource.filter((item) =>
        item.userName.toLowerCase().includes(searchText)
    );

    return (
        <div>
            <Input.Search
                placeholder="Search by Username"
                onChange={handleSearch}
                style={{ marginBottom: 16 }}
            />
            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{
                    pageSize: 8,
                }}
                scroll={{
                    x: 1500,
                }}
                onChange={handleChange}
            />
        </div>
    );
};

export default UserTable;
