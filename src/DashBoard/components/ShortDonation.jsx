import { useState } from "react";
import { Table } from "antd";

const ShortDonation = () => {
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (_, __, sorter) => {
    setSortedInfo(sorter);
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
      sortOrder:
        sortedInfo.columnKey === "completionDate" ? sortedInfo.order : null,
    },
    {
      title: "WHY Status",
      dataIndex: "status",
      key: "status",
      width: 150,
    },
  ];

  const dataSource = Array.from({ length: 10 }).map((_, i) => ({
    key: i,
    slNo: i + 1,
    userName: `User ${i + 1}`,
    userImage: `https://i.pravatar.cc/150?img=${i + 1}`,
    email: `user${i + 1}@example.com`,
    address: "123 Street, Dhaka",
    phone: `123-456-${i.toString().padStart(4, "0")}`,
    status: "yes",
    completionDate: `2025-01-${(i % 31) + 1} 12:${i % 60}:00`,
  }));

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{
          x: 1500,
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default ShortDonation;
