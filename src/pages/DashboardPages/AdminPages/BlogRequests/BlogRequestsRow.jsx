import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { toast } from 'sonner';
import BlogRequestsRowSkeleton from "./BlogRequestsRowSkeleton";

const BlogRequestsRow = ({ blogRequest, idx, refetch, isFetching }) => {
  const axiosPublic = useAxiosPublic();
  const handleAcceptBlog = () => {
    axiosPublic
      .put(`/blogs/${blogRequest._id}`, { status: "Accepted" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success("Blog Accepted");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  // this is a handle Reject function
  const handleRejectBlog = () => {
    axiosPublic
      .put(`/blogs/${blogRequest._id}`, { status: "Rejected" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.error("Blog Rejected");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  if(isFetching){
    return <BlogRequestsRowSkeleton></BlogRequestsRowSkeleton>
  }
  return (
    <tr>
      <td className="text-left">{idx + 1}</td>
      <td className="text-left">{blogRequest.title}</td>
      <td className="text-left">{blogRequest?.bloggerInfo?.name}</td>
      <td className="text-left">
        <div className="flex items-center gap-2">
          <div className="bg-primary w-8 h-7 mx-auto rounded-md flex items-center justify-center text-white">
            <Link to={`/dashboard/adminBlogDetails/${blogRequest._id}`}>
              <IoEyeOutline></IoEyeOutline>
            </Link>
          </div>
          <div className="bg-green-500 w-8 h-7 mx-auto rounded-md flex items-center justify-center text-white">
            <button onClick={handleAcceptBlog}>
              <TiTickOutline></TiTickOutline>
            </button>
          </div>
          <div className="bg-red-500 w-8 h-7 mx-auto rounded-md flex items-center justify-center text-white">
            <button onClick={handleRejectBlog}>
              <RxCross2></RxCross2>
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

BlogRequestsRow.propTypes = {
  blogRequest: PropTypes.object,
  idx: PropTypes.number,
  refetch: PropTypes.func,
};

export default BlogRequestsRow;
