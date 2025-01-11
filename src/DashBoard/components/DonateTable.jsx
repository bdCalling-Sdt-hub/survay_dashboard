import React from "react";
import { Table } from "antd";
import { MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";

const DonateTable = () => {

    const columns = [
        {
            title: "SL No",
            width: 100,
            dataIndex: "slNo",
            key: "name",
            fixed: "left",
        },
        {
            title: "User Name",
            width: 100,
            dataIndex: "age",
            key: "age",
            fixed: "left",
        },
        {
            title: "Email",
            dataIndex: "address",
            key: "1",
            width: 150,
        },
        {
            title: "Phone",
            dataIndex: "date",
            key: "2",
            width: 150,
        },
        {
            title: "Completion Date",
            dataIndex: "transectionId",
            key: "3",
            width: 150,
        },
        {
            title: "Message",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (_, record) => (
                <Link
                    to={`https://mail.google.com/mail/?view=cm&fs=1&to=${record.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <MdMessage className="text-white w-8 p-2  hover:opacity-75 h-8 rounded-md bg-[#2d5882]" />
                </Link>
            ),
        },
    ];
    const dataSource = Array.from({ length: 100 }).map((_, i) => ({
        key: i,
        slNo: i + 1,
        date: "28 Jan, 12:30 AM",
        age: `User ${i + 1}`,
        address: `user${i + 1}@example.com`,
        number: `$ ${Math.floor(Math.random() * 200)}`,
        transectionId: Math.random() * 100,
    }));

    return (
        <Table
            // loading={true}
            columns={columns}
            pagination={{
                pageSize: 8,
                total: 120,
                onChange: (page) => console.log(page),
                showSizeChanger: false
            }}
            dataSource={dataSource}
            scroll={{
                x: 1500,
            }}
            summary={() => (
                <Table.Summary fixed="top">
                    <Table.Summary.Row />
                </Table.Summary>
            )}
        />
    );
};

export default DonateTable;
