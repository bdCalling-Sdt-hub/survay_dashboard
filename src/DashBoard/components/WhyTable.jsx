import React, { useState } from "react";
import { Table, Input, Modal } from "antd";
import { MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import ResultOfWhyUser from "./ResultOfWhyUser";

const WhyTable = () => {
    const [searchText, setSearchText] = useState("");
    const [sortedInfo, setSortedInfo] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleSearch = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    const handleChange = (_, __, sorter) => {
        setSortedInfo(sorter);
    };

    const handleUserDetails = (user) => {
        setIsModalVisible(true);
    };
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };



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
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            width: 150,
        },
        {
            title: "Completion Date",
            dataIndex: "completionDate",
            key: "completionDate",
            width: 150,
            sorter: (a, b) => new Date(a.completionDate) - new Date(b.completionDate),
            sortOrder: sortedInfo.columnKey === "completionDate" ? sortedInfo.order : null,
        },
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <FaEye
                        onClick={() => handleUserDetails(record)}
                        className="text-white w-8 p-2 cursor-pointer hover:opacity-75 h-8 rounded-md bg-blue-300"
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
        phone: `123-456-${i.toString().padStart(4, "0")}`,
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
                    showSizeChanger: false,
                    pageSize: 8,
                }}
                scroll={{
                    x: 1500,
                }}
                onChange={handleChange}
            />
            <Modal
                title={null}
                open={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
                width={1200}
                className="user-modal md:min-w-[800px]"
            >
                <ResultOfWhyUser />
            </Modal>
        </div>
    );
};

export default WhyTable;
