import UserTable from '../components/UserTable';
import { Button, Spin } from 'antd';
import { CSVLink } from 'react-csv';
import { PiFileCsvFill } from 'react-icons/pi';
import { useGetNormalUserQuery } from '../../redux/services/userApis';

function UserManage() {
  const { data, isLoading } = useGetNormalUserQuery({});
  const headers = [
    { label: 'User ID', key: 'userId' },
    { label: 'Name', key: 'name' },
    { label: 'Phone', key: 'phone' },
    { label: 'Email', key: 'email' },
    { label: 'Date of Birth', key: 'dateOfBirth' },
    { label: 'Signup Date', key: 'createdAt' },
    { label: 'Updated Date', key: 'updatedAt' },
    { label: 'Status', key: 'status' },
    { label: 'Profile Image', key: 'profileImage' },
  ];

  const csvData =
    data?.data?.result?.map((item) => ({
      userId: item?.user?._id || 'N/A',
      name: item?.user?.name || 'N/A',
      phone: item?.user?.phone || 'N/A',
      email: item?.email || 'N/A',
      dateOfBirth: item?.dateOfBirth
        ? new Date(item?.dateOfBirth).toLocaleDateString()
        : 'N/A',
      createdAt: item?.createdAt
        ? new Date(item?.createdAt).toLocaleDateString()
        : 'N/A',
      updatedAt: item?.updatedAt
        ? new Date(item?.updatedAt).toLocaleDateString()
        : 'N/A',
      status: item?.user?.status || 'N/A',
      profileImage: item?.profile_image || 'N/A',
    })) || [];

  return (
    <div>
      <div className="flex pt-4 items-center mb-12 justify-between w-full p-2 rounded-md bg-[#d6f4ff]">
        <h1 className="font-bold text-xl">User Management</h1>
        <CSVLink
          data={csvData}
          headers={headers}
          filename={`user-management-${new Date().toISOString()}.csv`}
          className="flex items-center justify-center gap-2"
        >
          <Button className="bg-[#003366] hover:bg-[#003366]/70 text-white flex items-center gap-1">
            <PiFileCsvFill />
            {isLoading ? <Spin size="small"></Spin> : 'Export to CSV'}
          </Button>
        </CSVLink>
      </div>
      <UserTable />
    </div>
  );
}

export default UserManage;
