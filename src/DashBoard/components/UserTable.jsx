/* eslint-disable react/no-unescaped-entities */
import { useMemo, useState } from 'react';
import { Table, Input, Modal, Button, Spin } from 'antd';
import { MdBlock, MdMessage } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { GrAnnounce } from 'react-icons/gr';
import {
  useGetNormalUserQuery,
  useSendAnnouncementMutation,
  useUpdateStatusMutation,
} from '../../redux/services/userApis';
import { imageUrl } from '../../utils/server';
import JoditEditor from 'jodit-react';
import toast from 'react-hot-toast';

const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const UserTable = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sortedInfo, setSortedInfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, isLoading } = useGetNormalUserQuery({
    searchTerm: searchText,
    page,
  });
  const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation();
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [sendAnnouncement, { isLoading: isSending }] =
    useSendAnnouncementMutation();

  const debouncedSearch = debounce((value) => {
    setSearchText(value.toLowerCase());
  }, 200);

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleChange = (_, __, sorter) => {
    setSortedInfo(sorter);
  };

  const handleBlockUser = async (selectedUser) => {
    if (!selectedUser) return;

    const { id, status } = selectedUser;
    const isBlocked = status === 'blocked';
    const updatedStatus = isBlocked ? 'in-progress' : 'blocked';

    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text:
          'You want to ' + (isBlocked ? 'unblock' : 'block') + ' this user!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, ${isBlocked ? 'unblock' : 'block'} the user!`,
      });

      if (!result.isConfirmed) return;

      await updateStatus({
        id,
        data: { status: updatedStatus },
      }).unwrap();

      toast.success(`User has been ${updatedStatus}.`);
      handleCloseModal();
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          'Something went wrong. Please try again.'
      );
    }
  };

  const handleUserDetails = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };
  const showAnnounceModal = () => {
    setAnnounce(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: 'SL No',
      width: 100,
      dataIndex: 'slNo',
      key: 'slNo',
    },
    {
      title: 'User Info',
      width: 200,
      dataIndex: 'userInfo',
      key: 'userInfo',

      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={imageUrl(record.profileImage)}
            alt="User"
            className="w-10 h-10 object-cover rounded-full"
          />
          <div className="flex flex-col">
            <span>{record.name}</span>
            <span>{record.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Signup Date',
      dataIndex: 'createdAt',
      key: 'createdAt',

      sorter: (a, b) => new Date(a.completionDate) - new Date(b.completionDate),
      sortOrder:
        sortedInfo.columnKey === 'completionDate' ? sortedInfo.order : null,
    },
    {
      title: 'User Status',
      dataIndex: 'status',
      key: 'status',

      render: (status) => (
        <span>
          {status === 'in-progress' ? (
            <div className="bg-green-500 w-fit px-3 text-white rounded-md">
              Active
            </div>
          ) : (
            <div className="bg-red-500 w-fit px-3 text-white rounded-md">
              Blocked
            </div>
          )}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <FaUser
            onClick={() => handleUserDetails(record)}
            className="text-white w-8 p-2 cursor-pointer hover:opacity-75 h-8 rounded-md bg-blue-300"
          />
          <MdBlock
            onClick={() => handleBlockUser(record)}
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

  const dataSource = data?.data?.result?.map((item, i) => ({
    key: item?._id,
    slNo: i + 1,
    name: item?.name || 'N/A',
    profileImage: item?.profile_image,
    email: item?.email || 'N/A',
    address: `${item?.city || 'N/A'}, ${item?.country || 'N/A'}`,
    status: item?.user?.status || 'N/A',
    id: item?.user?._id || 'N/A',
    createdAt: new Date(item?.createdAt).toLocaleDateString() || 'N/A',
    phone: item?.phone || 'N/A',
    city: item?.city || 'N/A',
    country: item?.country || 'N/A',
    profession: item?.profession || 'N/A',
    dob: item?.dateOfBirth || 'N/A',
    education: item?.education || 'N/A',
  }));

  const [announce, setAnnounce] = useState(false);

  const content = useMemo(() => {
    return (
      <JoditEditor
        value={announcementMessage}
        onBlur={(newContent) => {
          setAnnouncementMessage(newContent);
        }}
        config={{
          readonly: false,
          toolbarSticky: false,
          height: 500,
          width: '100%',
        }}
      />
    );
  }, [announcementMessage]);

  const handleSend = async () => {
    const data = {
      title: announcementTitle,
      message: { __html: announcementMessage },
    };
    if (!data?.title || !data?.message) {
      toast.error('Please enter title and message.');
      return;
    }
    const response = await sendAnnouncement(data).unwrap();
    if (response.success) {
      toast.success('Announcement sent successfully.');
      setAnnounce(false);
    } else {
      toast.error('Failed to send announcement.');
    }
  };

  const handleCloseAnnounceModal = () => {
    // console.log("Modal Closed");
    setAnnounce(false);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Input.Search
          placeholder="Search by Username"
          onChange={handleSearch}
          style={{ marginBottom: 16 }}
        />
        <Button
          onClick={() => showAnnounceModal()}
          style={{ marginBottom: 16, fontSize: '20px' }}
        >
          <GrAnnounce />
        </Button>
      </div>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
        pagination={{
          pageSize: data?.data?.meta?.limit || 10,
          total: data?.data?.meta?.total || 0,
          showSizeChanger: false,
          onChange: (page) => setPage(page),
        }}
        onChange={handleChange}
      />

      {/* User Details Modal */}
      <Modal
        width={1200}
        title={null}
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        className="user-modal"
      >
        {selectedUser && (
          <div className="p-4">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-24 h-24 rounded-full p-[3px] border-[3px] border-blue-500 overflow-hidden">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={imageUrl(selectedUser?.profileImage)}
                  alt={selectedUser?.name}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  {selectedUser?.name || 'N/A'}
                </h1>
                <p className="text-sm text-gray-500">
                  "Unlock Your Potential: Discover, Embrace, and Share Your
                  'Why'"
                </p>
              </div>
            </div>

            {/* User Profile Section */}
            <h3 className="text-lg font-semibold mb-2">User Profile</h3>

            <div className="flex gap-12 w-full">
              {/* Personal Info */}
              <div className="flex-1">
                <h4 className="text-md font-semibold mt-4 mb-2">Personal</h4>
                <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                  <strong>Name:</strong> {selectedUser?.name || 'N/A'}
                </p>
                <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                  <strong>Profession:</strong>
                  {selectedUser?.profession || 'N/A'}
                </p>
                <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                  <strong>Date of Birth:</strong> {selectedUser?.dob || 'N/A'}
                </p>
                <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                  <strong>Education level:</strong>
                  {selectedUser?.education || 'N/A'}
                </p>
              </div>

              {/* Contact Info */}
              <div className="flex-1">
                <h4 className="text-md font-semibold mt-4 mb-2">Contact</h4>
                <div>
                  <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                    <strong>Email:</strong> {selectedUser?.email || 'N/A'}
                  </p>
                  <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                    <strong>Phone Number:</strong>
                    {selectedUser?.phone || 'N/A'}
                  </p>
                  <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                    <strong>Country:</strong> {selectedUser?.country || 'N/A'}
                  </p>
                  <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                    <strong>City:</strong> {selectedUser?.city || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
            {/* Footer Actions */}
            <div className="flex justify-end mt-6">
              <div className="flex gap-2">
                <button
                  className={`hover:bg-[#f0f8ff] hover:border border-[#00b0f2] hover:text-[#00b0f2] 
        ${
          selectedUser?.status === 'blocked'
            ? 'bg-[#00b0f2] text-white'
            : 'bg-[#00b0f2] text-white'
        } 
        px-4 py-2 rounded-md`}
                  onClick={() => handleBlockUser(selectedUser)}
                >
                  {isUpdating ? (
                    <Spin size="small" />
                  ) : selectedUser?.status === 'blocked' ? (
                    'Unblock'
                  ) : (
                    'Block'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        title="Send an Announcement to Users"
        open={announce}
        width={1200}
        onCancel={handleCloseAnnounceModal}
        footer={null}
        centered
      >
        {/* Announcement Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Announcement Title:
          </label>
          <Input
            placeholder='"Upcoming Maintenance Notification"'
            className="w-full"
            value={announcementTitle}
            onChange={(e) => {
              // console.log("Title Updated:", e.target.value);
              setAnnouncementTitle(e.target.value);
            }}
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Message:</label>
          <div className="w-full">{content}</div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button onClick={handleCloseAnnounceModal}>Cancel</Button>
          <Button type="primary" onClick={handleSend}>
            {isSending ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserTable;
