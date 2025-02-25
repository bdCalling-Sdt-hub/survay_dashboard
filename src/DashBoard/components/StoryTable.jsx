import { useState, useEffect } from 'react';
import { Input, Modal, Table } from 'antd';
import { FaEye, FaRegCalendarCheck, FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import {
  useGetAllStoryQuery,
  useApproveStoryMutation,
  useDeleteStoryMutation,
} from '../../redux/services/storyApis';
import { imageUrl } from '../../utils/server';

const StoryTable = () => {
  const [activeFilter, setActiveFilter] = useState('Pending');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [approvedStory, { isLoadingStory }] = useApproveStoryMutation();
  const [deleteStory, { isLoading: isDeleting }] = useDeleteStoryMutation();

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 200);

    return () => clearTimeout(handler);
  }, [searchTerm]);
  const { data: storyData, isLoading } = useGetAllStoryQuery({
    searchTerm: debouncedSearchTerm,
    status: activeFilter,
  });

  const dataSource =
    storyData?.data?.result?.map((item) => ({
      _id: item._id,
      title: item.title || 'N/A',
      description: item.description || 'N/A',
      story_image: item.story_image,
      author: {
        name: item.author?.name || 'N/A',
        image: item.author?.profile_image,
      },
      status: item.status || 'N/A',
      createdAt: item.createdAt || 'N/A',
    })) || [];

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteStory({ id }).unwrap();
          Swal.fire('Deleted!', 'The story has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete the story.', error);
        }
      }
    });
  };

  const handleApprove = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to approve this story!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await approvedStory({ id }).unwrap();
          Swal.fire('Approved!', 'The story has been approved.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to approve the story.', error);
        }
      }
    });
  };

  const handleStoryDetails = (story) => {
    console.log(story);
    setSelectedStory(story);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'SL No',
      key: 'index',
      width: 100,
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Story Media',
      dataIndex: 'story_image',
      key: 'story_image',
      width: 120,
      render: (src) => (
        <img
          src={imageUrl(src)}
          alt="Story"
          style={{
            width: 60,
            height: 60,
            objectFit: 'cover',
            borderRadius: '5px',
          }}
        />
      ),
    },
    {
      title: 'Story Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Story Description',
      dataIndex: 'description',
      key: 'description',
      render: (content) => (
        <div
          dangerouslySetInnerHTML={{
            __html:
              content && content.length > 50
                ? content.substring(0, 50) + '...'
                : content,
          }}
        />
      ),
    },
    {
      title: 'Publish Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <FaEye
            onClick={() => handleStoryDetails(record)}
            className="text-white cursor-pointer bg-[#00B0F2] w-8 p-2 hover:opacity-75 h-8 rounded-md"
          />
          {record.status !== 'Approved' && (
            <FaRegCalendarCheck
              onClick={() => handleApprove(record._id)}
              className={`text-white cursor-pointer w-8 p-2 hover:opacity-75 h-8 rounded-md ${
                isLoadingStory
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#2d5882]'
              }`}
              disabled={isLoadingStory}
            />
          )}
          <FaRegTrashAlt
            disabled={isDeleting}
            onClick={() => handleDelete(record._id)}
            className="text-white cursor-pointer w-8 p-2 hover:opacity-75 h-8 rounded-md bg-red-600"
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <Input.Search
          placeholder="Search by title"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: 16 }}
          allowClear
        />
      </div>

      {/* Filter Buttons */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '24px' }}>
        <button
          onClick={() => setActiveFilter('Pending')}
          className={
            activeFilter === 'Pending'
              ? 'text-[#00B0F2] border-b-2 text-base border-[#00B0F2]'
              : 'text-base'
          }
        >
          Requested Stories
        </button>
        <button
          onClick={() => setActiveFilter('Approved')}
          className={
            activeFilter === 'Approved'
              ? 'text-[#00B0F2] text-base border-b-2 border-[#00B0F2]'
              : 'text-base'
          }
        >
          Approved Stories
        </button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={{
          pageSize: 6,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        rowKey="_id"
      />

      {/* Modal */}
      <Modal
        title={selectedStory?.title || 'Story Details'}
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        {selectedStory && (
          <div>
            <img
              src={
                selectedStory?.story_image
                  ? imageUrl(selectedStory?.story_image)
                  : 'https://via.placeholder.com/300'
              }
              alt={selectedStory?.title}
              className="rounded-lg object-cover w-full h-auto max-h-72"
            />
            <h2 className="text-2xl font-bold mt-4">{selectedStory?.title}</h2>
            <div
              className="mt-3"
              dangerouslySetInnerHTML={{
                __html: selectedStory?.description || '',
              }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StoryTable;
