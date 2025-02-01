import { useState } from "react";
import BlogTable from "../components/BlogTable";
import { Button, Modal } from "antd";
import { PiFileCsvFill } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";
import NewBlogAdd from "../components/NewBlogAdd";

function BlogManagePage() {
  const [showEditBlogModal, setShowEditBlogModal] = useState(false);

  return (
    <div>
      <div className="flex pt-4 items-center mb-12 justify-between w-full p-2 rounded-md bg-[#d6f4ff]">
        <h1 className="font-bold text-xl">Blog Management</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-[#003366] hover:bg-[#003366]/70 text-white flex items-center gap-1">
            <PiFileCsvFill />
            Export to CSV
          </Button>
          <Button
            onClick={() => setShowEditBlogModal(true)}
            className="bg-[#003366] hover:bg-[#003366]/70 text-white flex items-center gap-1"
          >
            <FaPlus />
            Add Blog
          </Button>
        </div>
      </div>
      <BlogTable />
      {showEditBlogModal && (
        <Modal
          open={showEditBlogModal}
          onCancel={() => setShowEditBlogModal(false)}
          footer={null}
          width={1200}
        >
          <NewBlogAdd setShowEditBlogModal={setShowEditBlogModal} />
        </Modal>
      )}
    </div>
  );
}

export default BlogManagePage;
