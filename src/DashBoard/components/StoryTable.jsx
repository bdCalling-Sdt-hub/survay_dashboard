import { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import { FaEye, FaRegCalendarCheck, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { SlCalender } from "react-icons/sl";

const story = [
  {
    id: 1,
    bannerImage:
      "https://static.vecteezy.com/system/resources/thumbnails/033/168/339/small_2x/a-young-black-man-in-a-suit-and-tie-ai-generative-free-photo.jpg",
    title:
      "Discovering My True Purpose: A Journey of Trust and Self-Discovery.",
    description:
      "When I first adopted Luna, she was skittish and avoided people, especially men. She had been through some traumatic experiences in her previous home, and it took time before she started to trust me. I, too, had my own issues with trust. Life had shown me some tough lessons, and I found it hard to believe that anyone, or anything, could remain stable.The first few weeks were challenging. Every new person who came into our lives felt like a potential threat to Luna. She would bark and hide behind me, her eyes full of fear. I understood her, though; I’d been there. My own guard was up, and I struggled to let anyone close.Then Kevin entered the picture. Kevin had an innate calmness about him. He wasn’t intimidated by Luna’s hesitancy, nor was he quick to dismiss her. He sat with her quietly, allowing her to approach him when she was ready. I watched as he earned her trust, and I realized something: I could learn from him. Kevin wasn’t just showing Luna how to trust; he was also teaching me how to trust again. Slowly, as Luna became more comfortable, I did too. Together, we learned that trust doesn’t have to be given all at once—it’s something that’s built over time, with patience, consistency, and love. Now, Luna and I are in a better place. She’s more confident, and I feel a sense of peace that I haven’t felt in years. Kevin didn’t just bring stability into our lives; he brought a new way of seeing the world and, more importantly, ourselves.",
    author: {
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/033/168/339/small_2x/a-young-black-man-in-a-suit-and-tie-ai-generative-free-photo.jpg",
      name: "Hosain Ali",
    },
    date: "2025-01-07",
    insights: {
      theme: "Healing and trust-building between a dog and owner",
      tone: "Warm, personal, and reflective",
      lesson:
        "Trust is a gradual process that requires patience and understanding from both parties.",
    },
  },
];

const StoryTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("notApproved");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  console.log(selectedUser);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleFilter = (isApproved) => {
    const filtered = data.filter((item) => item.approve === isApproved);
    setFilteredData(filtered);
    setActiveFilter(isApproved ? "approved" : "notApproved");
  };

  const approvedHandle = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Approved!",
          text: "The item has been successfully approved.",
          icon: "success",
        });
      }
    });
  };

  const handleUserDetails = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: "SL No",
      key: "index",
      width: 50,
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: "Story Media",
      dataIndex: "bannerImage",
      key: "bannerImage",
      width: 120,
      render: (src) => (
        <img
          src={src}
          alt="Story"
          style={{
            width: 60,
            height: 60,
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
      ),
    },
    {
      title: "Story Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Story Description",
      dataIndex: "description",
      key: "description",
      render: (description) =>
        description && description.length > 50
          ? description.substring(0, 50) + "..."
          : description || "No description available",
    },
    {
      title: "Publish Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <FaEye
            onClick={() => handleUserDetails(record)}
            className="text-white cursor-pointer bg-[#00B0F2] w-8 p-2 hover:opacity-75 h-8 rounded-md"
          />
          {!record.approve && (
            <FaRegCalendarCheck
              onClick={() => approvedHandle()}
              className="text-white cursor-pointer w-8 p-2 hover:opacity-75 h-8 rounded-md bg-[#2d5882]"
            />
          )}
          <FaRegTrashAlt
            onClick={() => handleDelete()}
            className="text-white cursor-pointer w-8 p-2 hover:opacity-75 h-8 rounded-md bg-red-600"
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/story.json");
        setData(response.data);
        setFilteredData(response.data.filter((item) => item.approve === false));
      } catch (error) {
        console.error("Error fetching story data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
        <button
          onClick={() => handleFilter(false)}
          className={`${
            activeFilter !== "approved"
              ? "text-[#00B0F2] border-b-2 border-[#00B0F2]"
              : ""
          }`}
        >
          Requested Stories
        </button>
        <button
          onClick={() => handleFilter(true)}
          className={`${
            activeFilter !== "approved"
              ? ""
              : "text-[#00B0F2] border-b-2 border-[#00B0F2]"
          }`}
        >
          Approved Stories
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={{
          pageSize: 6,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        rowKey="id"
      />
      <Modal
        title={selectedUser?.title || "Story Details"}
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={1000}
        className="custom-modal"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Story Banner Image */}
          <div className="flex-shrink-0">
            <img
              src={
                selectedUser?.bannerImage ||
                "https://via.placeholder.com/300x200"
              }
              alt={selectedUser?.title || "Story Banner"}
              className="rounded-lg object-cover w-full h-auto max-h-72"
            />
          </div>

          {/* Story Details */}
          <div className="flex-grow">
            {/* Title and Author Details */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedUser?.title || "Story Title"}
              </h2>
              <div className="flex items-center mt-2 text-gray-600">
                <img
                  src={
                    selectedUser?.author?.image ||
                    "https://via.placeholder.com/40"
                  }
                  alt={selectedUser?.author?.name || "Author"}
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <p className="text-sm">
                  {selectedUser?.author?.name || "Unknown Author"}
                </p>
                <div className="flex items-center ml-4 text-sm">
                  <SlCalender className="mr-1" />
                  <span>
                    {new Date(selectedUser?.date).toLocaleDateString() || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Story Description */}
            <div className="mb-6 text-gray-700">
              {selectedUser?.description
                ? story?.description?.split("\n").map((para, index) => (
                    <p key={index} className="mb-4">
                      {para}
                    </p>
                  ))
                : "No description available for this story."}
            </div>

            {/* Insights */}
            {selectedUser?.insights && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Story Insights:
                </h3>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>
                    <strong>Theme:</strong> {selectedUser?.insights?.theme}
                  </li>
                  <li>
                    <strong>Tone:</strong> {selectedUser?.insights?.tone}
                  </li>
                  <li>
                    <strong>Lesson:</strong> {selectedUser?.insights?.lesson}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StoryTable;
