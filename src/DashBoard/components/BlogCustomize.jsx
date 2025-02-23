/* eslint-disable react/prop-types */
import { imageUrl } from "../../utils/server";
function BlogCustomize({ selectedBlog }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div className="flex flex-col gap-6 items-start">
        <p className="text-xs sm:text-sm bg-blue-200 text-blue-800 px-3 py-1 rounded-full">
          {selectedBlog?.hashtag}
        </p>
        <h1 className="text-[#1D3557] text-2xl sm:text-4xl lg:text-5xl font-bold">
          {selectedBlog?.title}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
        <strong>Date:</strong> {new Date(selectedBlog?.createdAt).toLocaleString("en-US") || "N/A"}
        </p>
        <img
          src={imageUrl(selectedBlog.blog_image)}
          alt={selectedBlog?.title}
          className="w-[200px] sm:max-h-[300px] object-cover rounded-lg shadow-lg"
        />
        <p
          dangerouslySetInnerHTML={{ __html: selectedBlog?.description }}
          className="text-gray-600 text-sm sm:text-base"
        >
          <strong>Description:</strong>{" "}
          {selectedBlog?.description || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default BlogCustomize;

