import { useState } from "react";
import { Modal, Table } from "antd";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import Swal from "sweetalert2";
import BlogCustomize from "./BlogCustomize";
import BlogEdit from "./BlogEdit";
import {
  useDeleteBlogMutation,
  useGetAllBlogQuery,
} from "../../redux/services/blogApis";
import { imageUrl } from "../../utils/server";

const BlogTable = () => {
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showEditBlogModal, setShowEditBlogModal] = useState(false);
  const [selectedBlog, setSelectedBlog, refetch] = useState(null);
  const { data: allBlogData, isLoading } = useGetAllBlogQuery();
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBlog({ id }).unwrap();
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          error?.data?.message || "Something went wrong!",
          "error"
        );
      }
    }
  };

  const columns = [
    {
      title: "SL No",
      dataIndex: "_id",
      key: "_id",
      width: 50,
      render: (_, __, index) => (
        <span>{(index + 1).toString().padStart(2, "0")}</span>
      ),
    },
    {
      title: "Blog Media",
      dataIndex: "blog_image",
      key: "blog_image",
      width: 120,
      render: (src) => (
        <img
          src={imageUrl(src)}
          alt="Blog"
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
      title: "Blog Hashtag",
      dataIndex: "hashtag",
      key: "hashtag",
      render: (text) => (
        <span style={{ color: "#2d5882", fontWeight: "bold" }}>{text}</span>
      ),
    },
    {
      title: "Blog Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Blog Description",
      dataIndex: "description",
      key: "description",
      render: (content) => (
        <span
          dangerouslySetInnerHTML={{
            __html:
              content && content.length > 50
                ? content.substring(0, 50) + "..."
                : content,
          }}
        />
      ),
    },
    {
      title: "Publish Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <FaEye
            onClick={() => {
              setSelectedBlog(record);
              setShowBlogModal(true);
            }}
            className="text-white hover:opacity-75 bg-[#00B0F2] w-8 p-2 h-8 rounded-md cursor-pointer"
          />

          <MdModeEdit
            onClick={() => {
              setSelectedBlog(record);
              setShowEditBlogModal(true);
            }}
            className="text-white hover:opacity-75 w-8 p-2 h-8 rounded-md bg-[#2d5882] cursor-pointer"
          />

          <FaRegTrashAlt
            onClick={() => handleDelete(record._id)}
            className="text-white hover:opacity-75 w-8 p-2 h-8 rounded-md bg-red-600 cursor-pointer"
          />
        </div>
      ),
    },
  ];

  const dataSource = allBlogData?.data?.result?.map((item) => ({
    _id: item?._id,
    title: item?.title,
    hashtag: item?.hashtag,
    blog_image: item?.blog_image,
    description: item?.description,
    createdAt: item?.createdAt,
  }));

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={{
          pageSize: 10,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        rowKey="_id"
      />

      {showBlogModal && selectedBlog && (
        <Modal
          title="Blog Details"
          open={showBlogModal}
          onCancel={() => setShowBlogModal(false)}
          footer={null}
          width={1200}
        >
          <BlogCustomize
            setSelectedBlog={setSelectedBlog}
            setShowBlogModal={setShowBlogModal}
            showBlogModal={showBlogModal}
            selectedBlog={selectedBlog}
          />
        </Modal>
      )}

      {showEditBlogModal && selectedBlog && (
        <Modal
          title="Edit Blog"
          open={showEditBlogModal}
          onCancel={() => setShowEditBlogModal(false)}
          footer={null}
          width={1200}
        >
          <BlogEdit
            setShowEditBlogModal={setShowEditBlogModal}
            selectedBlog={selectedBlog}
            refetch={refetch}
          />
        </Modal>
      )}
    </div>
  );
};

export default BlogTable;
