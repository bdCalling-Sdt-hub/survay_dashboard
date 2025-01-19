import{ useState } from "react";
import { Table, Input, Modal, Button } from "antd";
import { MdBlock, MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { GrAnnounce } from "react-icons/gr";
import TextArea from "antd/es/input/TextArea";

const UserTable = () => {
    const [searchText, setSearchText] = useState("");
    const [sortedInfo, setSortedInfo] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [announce, setAnnounce] = useState(false);

    const handleSearch = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    const handleChange = (_, __, sorter) => {
        setSortedInfo(sorter);
    };

    const handleBockUser = () => {
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
                    title: "Blocked!",
                    text: "User has been blocked.",
                    icon: "success"
                });
            }
        });
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
    const handleCloseAnnounceModal = () => {
        setAnnounce(false);
    };

    const handleCancel = () => {
        setAnnounce(false);
    };

    const handleSend = () => {
        console.log("Announcement Sent");
        setAnnounce(false);
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
            width: 150,
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <FaUser
                        onClick={() => handleUserDetails(record)}
                        className="text-white w-8 p-2 cursor-pointer hover:opacity-75 h-8 rounded-md bg-blue-300"
                    />
                    <MdBlock
                        onClick={() => handleBockUser()}
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
                columns={columns}
                dataSource={filteredData}
                pagination={{
                    showSizeChanger: false,
                    pageSize: 8,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`,
                }}
                scroll={{
                    x: 1500,
                }}
                onChange={handleChange}
            />

            {/* User Details Modal */}
            <Modal
                title={null}
                open={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
                className="user-modal md:min-w-[800px]"
            >
                {selectedUser && (
                    <div className="p-4">
                        {/* Profile Header */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-24 h-24 rounded-full p-[3px] border-[3px] border-blue-500 overflow-hidden">
                                <img
                                    className="w-full h-full rounded-full object-cover"
                                    src={selectedUser.userImage}
                                    alt={selectedUser.userName}
                                />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">{selectedUser.userName}</h1>
                                <p className="text-sm text-gray-500">
                                    "Unlock Your Potential: Discover, Embrace, and Share Your 'Why'"
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
                                    <strong>Name:</strong> {selectedUser.userName || "N/A"}
                                </p>
                                <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                                    <strong>Profession:</strong> {selectedUser.profession || "Developer"}
                                </p>
                                <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                                    <strong>Date of Birth:</strong> {selectedUser.dob || "05/05/2002"}
                                </p>
                                <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                                    <strong>Education level:</strong> {selectedUser.education || "Bachelor's Degree"}
                                </p>
                            </div>


                            {/* Contact Info */}
                            <div className="flex-1">
                                <h4 className="text-md font-semibold mt-4 mb-2">Contact</h4>
                                <div>
                                    <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                                        <strong>Email:</strong> {selectedUser.email || "N/A"}
                                    </p>
                                    <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                                        <strong>Phone Number:</strong> {selectedUser.phone || "N/A"}
                                    </p>
                                    <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                                        <strong>Country:</strong> {selectedUser.country || "Bangladesh"}
                                    </p>
                                    <p className="mb-2 w-full p-2 border-[1px] rounded-lg">
                                        <strong>City:</strong> {selectedUser.city || "N/A"}
                                    </p>
                                </div>
                            </div>

                        </div>
                        {/* Footer Actions */}
                        <div className="flex justify-end mt-6">
                            <div className=" flex gap-2">
                                <button
                                    className="bg-[#f0f8ff] hover:opacity-75 border-[1px] border-[#00b0f2] text-[#00b0f2] px-4 py-2 rounded-md"
                                    onClick={() => handleDeleteUser(selectedUser.id)}
                                >
                                    Delete User
                                </button>
                                <button
                                    className="hover:bg-[#f0f8ff] hover:border-[1px] hover:border-[#00b0f2] hover:text-[#00b0f2] bg-[#00b0f2]  border-[1px] border-[#00b0f2] text-white px-4 py-2 rounded-md"
                                    onClick={() => handleBlockUser(selectedUser.id)}
                                >
                                    Block
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal
                title="Send an Announcement to Users"
                open={announce}
                onCancel={handleCloseAnnounceModal}
                footer={null}
                centered
            >
                {/* Announcement Title */}
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Announcement Title:</label>
                    <Input
                        placeholder='"Upcoming Maintenance Notification"'
                        className="w-full"
                    />
                </div>

                {/* Message */}
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Message:</label>
                    <TextArea
                        rows={4}
                        placeholder='"Dear Users, we will be performing a scheduled system maintenance on [Date] from [Start Time] to [End Time]. During this time, the site may be temporarily unavailable. We apologize for any inconvenience caused. Thank you for your understanding."'
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" onClick={handleSend}>
                        Send
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default UserTable;


