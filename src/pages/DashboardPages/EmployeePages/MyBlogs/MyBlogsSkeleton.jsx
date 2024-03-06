import { LuPenLine } from "react-icons/lu";
import { Link } from "react-router-dom";

const MyBlogsSkeleton = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold font-inter">My Blogs</h1>
        <Link to="/dashboard/addBlogs">
          <p className="edit_btn">
            <LuPenLine></LuPenLine> <span>Add Blog</span>
          </p>
        </Link>
      </div>
      <div className="border mt-5 p-3 rounded-lg flex justify-between items-center mb-4">
        <div className="skeleton w-[70%] h-6"></div>
        <div className="flex items-center gap-5">
          <div className="skeleton w-8 h-8 rounded-md"></div>
          <div className="skeleton w-8 h-8 rounded-md"></div>
        </div>
      </div>
      <div className="border mt-5 p-3 rounded-lg flex justify-between items-center mb-4">
        <div className="skeleton w-[70%] h-6"></div>
        <div className="flex items-center gap-5">
          <div className="skeleton w-8 h-8 rounded-md"></div>
          <div className="skeleton w-8 h-8 rounded-md"></div>
        </div>
      </div>
      <div className="border mt-5 p-3 rounded-lg flex justify-between items-center mb-4">
        <div className="skeleton w-[70%] h-6"></div>
        <div className="flex items-center gap-5">
          <div className="skeleton w-8 h-8 rounded-md"></div>
          <div className="skeleton w-8 h-8 rounded-md"></div>
        </div>
      </div>
      <div className="border mt-5 p-3 rounded-lg flex justify-between items-center mb-4">
        <div className="skeleton w-[70%] h-6"></div>
        <div className="flex items-center gap-5">
          <div className="skeleton w-8 h-8 rounded-md"></div>
          <div className="skeleton w-8 h-8 rounded-md"></div>
        </div>
      </div>
      <div className="border mt-5 p-3 rounded-lg flex justify-between items-center mb-4">
        <div className="skeleton w-[70%] h-6"></div>
        <div className="flex items-center gap-5">
          <div className="skeleton w-8 h-8 rounded-md"></div>
          <div className="skeleton w-8 h-8 rounded-md"></div>
        </div>
      </div>
      <div className="border mt-5 p-3 rounded-lg flex justify-between items-center mb-4">
        <div className="skeleton w-[70%] h-6"></div>
        <div className="flex items-center gap-5">
          <div className="skeleton w-8 h-8 rounded-md"></div>
          <div className="skeleton w-8 h-8 rounded-md"></div>
        </div>
      </div>
      <div className="border mt-5 p-3 rounded-lg flex justify-between items-center mb-4">
        <div className="skeleton w-[70%] h-6"></div>
        <div className="flex items-center gap-5">
          <div className="skeleton w-8 h-8 rounded-md"></div>
          <div className="skeleton w-8 h-8 rounded-md"></div>
        </div>
      </div>
      <div className="border mt-5 p-3 rounded-lg flex justify-between items-center mb-4">
        <div className="skeleton w-[70%] h-6"></div>
        <div className="flex items-center gap-5">
          <div className="skeleton w-8 h-8 rounded-md"></div>
          <div className="skeleton w-8 h-8 rounded-md"></div>
        </div>
      </div>
      <div className="border mt-5 p-3 rounded-lg flex justify-between items-center mb-4">
        <div className="skeleton w-[70%] h-6"></div>
        <div className="flex items-center gap-5">
          <div className="skeleton w-8 h-8 rounded-md"></div>
          <div className="skeleton w-8 h-8 rounded-md"></div>
        </div>
      </div>
      <div className="border mt-5 p-3 rounded-lg flex justify-between items-center mb-4">
        <div className="skeleton w-[70%] h-6"></div>
        <div className="flex items-center gap-5">
          <div className="skeleton w-8 h-8 rounded-md"></div>
          <div className="skeleton w-8 h-8 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogsSkeleton;
