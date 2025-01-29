import UserTable from "../components/UserTable";
import { Button, Spin } from "antd";
import { CSVLink } from "react-csv";
import { PiFileCsvFill } from "react-icons/pi";
import { useGetNormalUserQuery } from "../../redux/services/userApis";

function UserManage() {
  const { data, isLoading } = useGetNormalUserQuery();

  const headers = [
    { label: "User Info", key: "userInfo" },
    { label: "Email", key: "email" },
    { label: "Address", key: "address" },
    { label: "Signup Date", key: "createdAt" },
  ];

  const csvData =
    data?.data?.result?.map((item) => ({
      userInfo: `${item?.name || "N/A"}"`,
      email: item?.email || "N/A",
      address: `${item?.city || "N/A"}, ${item?.country || "N/A"}`,
      createdAt: item?.createdAt
        ? new Date(item?.createdAt).toLocaleDateString()
        : "N/A",
    })) || [];

  return (
    <div>
      <div className="flex items-center mb-12 justify-between w-full p-2 rounded-md bg-[#d6f4ff]">
        <h1 className="font-bold text-xl">User Management</h1>
        <CSVLink
          data={csvData}
          headers={headers}
          filename={`user-management-${new Date().toISOString()}.csv`}
          className="flex items-center justify-center gap-2"
        >
          <Button className="bg-[#003366] hover:bg-[#003366]/70 text-white flex items-center gap-1">
            <PiFileCsvFill />
            {isLoading ? <Spin size="small"></Spin> : "Export to CSV"}
          </Button>
        </CSVLink>
      </div>
      <UserTable />
    </div>
  );
}

export default UserManage;
