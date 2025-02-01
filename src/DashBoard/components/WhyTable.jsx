import { useState } from "react";
import { Table, Input, Modal } from "antd";
import { MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import ResultOfWhyUser from "./ResultOfWhyUser";
import { useGetAllWhyQuery } from "../../redux/services/whyApis";
import { imageUrl } from "../../utils/server";

const WhyTable = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, isLoading } = useGetAllWhyQuery();

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleUserDetails = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
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
      width: 150,
      dataIndex: "userInfo",
      key: "userInfo",
      fixed: "left",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={imageUrl(record.userImage)}
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
      width: 100,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 100,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 50,
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

  const dataSource =
    data?.data?.result?.map((item, index) => ({
      key: item._id,
      slNo: index + 1,
      userName: item.user?.name,
      userImage: item.user?.profile_image,
      email: item.user?.email,
      phone: item.user?.phone,
      initialSummary: item.initialSummary,
      keyPoints: item.keyPoints,
      strengths: item.strengths,
      weaknesses: item.weaknesses,
      pieChartData: item.pieChartData,
      progressBarData: item.progressBarData,
      finalSummary: item.finalSummary,
    })) || [];

  return (
    <div>
      <Input.Search
        placeholder="Search by Username"
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          showSizeChanger: false,
          pageSize: 8,
        }}
        // scroll={{
        //   x: 1500,
        // }}
      />
      <Modal
        title={null}
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={1200}
        className="user-modal md:min-w-[800px]"
      >
        {/* Pass the selected user's information as props */}
        <ResultOfWhyUser user={selectedUser} />
      </Modal>
    </div>
  );
};

export default WhyTable;
