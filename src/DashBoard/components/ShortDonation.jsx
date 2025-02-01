import { useState } from "react";
import { Table, Spin, Alert, Image } from "antd";
import { useGetNormalUserQuery } from "../../redux/services/userApis";

const ShortDonation = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const { data, isLoading, isError, error } = useGetNormalUserQuery({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setPagination(pagination);
  };

  const columns = [
    {
      title: "SL No",
      width: 50,
      dataIndex: "slNo",
      key: "slNo",
      fixed: "left",
    },
    {
      title: "User Info",
      width: 100,
      dataIndex: "userInfo",
      key: "userInfo",
      fixed: "left",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Image
            src={record.profileImage || "https://via.placeholder.com/40"}
            alt="User"
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
            preview={false}
          />
          <span>{record.name}</span>
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
      render: (_, record) =>
        `${record.city || "N/A"}, ${record.country || "N/A"}`,
    },
    {
      title: "Signup Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortOrder: sortedInfo.columnKey === "createdAt" ? sortedInfo.order : null,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (_, record) => record.user?.status || "N/A",
    },
  ];

  const dataSource = data?.data?.result?.map((item, i) => ({
    key: item?._id,
    slNo: i + 1,
    name: item?.name || "N/A",
    profileImage: item?.profile_image,
    email: item?.email || "N/A",
    city: item?.city || "N/A",
    country: item?.country || "N/A",
    user: item?.user || {},
    createdAt: item?.createdAt || "N/A",
  }));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert
          message="Error"
          description={error?.data?.message || "Failed to fetch data"}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data?.data?.meta?.total || 0,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          onChange: (page, pageSize) =>
            setPagination({ current: page, pageSize }),
        }}
        scroll={{ x: 1200 }}
        onChange={handleChange}
        loading={isLoading}
      />
    </div>
  );
};

export default ShortDonation;
