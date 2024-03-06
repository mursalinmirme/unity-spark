import { AiFillEdit } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { toast } from "sonner";
import Swal from "sweetalert2";
import MyBlogsSkeleton from "./MyBlogsSkeleton";

const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const {
    data: blogs = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/employee-blogs/${user.email}`);
      return res?.data;
    },
  });
  //    console.log(blogs)

  const handleDeleteBlog = (id) => {
    axiosPublic
      .delete(`/blogs/${id}`)
      .then((res) => {
        if (res?.data) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (res.data.deletedCount > 0) {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your blog has been deleted.",
                  icon: "success",
                });
                refetch();
              }
            }
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (isFetching) {
    return <MyBlogsSkeleton></MyBlogsSkeleton>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold font-inter">My Blogs</h1>
        <Link to="/dashboard/addBlogs">
          <p className="edit_btn">
            <AiFillEdit className="text-lg"></AiFillEdit> <span>Add Blog</span>
          </p>
        </Link>
      </div>
      {blogs.length > 0 ? (
        <div className="min-h-[62vh]">
          {blogs?.map((blog) => {
            return (
              <div
                className="border-2 p-3 my-4 rounded-lg flex justify-between items-center"
                key={blog?._id}
              >
                <div>
                  <h3 className="text-base font-bold">{blog?.title}</h3>
                </div>
                <div className="space-x-4 text-white">
                  <Link to={`/dashboard/editBlogs/blogs/${blog?._id}`}>
                    <button className="bg-primary rounded-md p-2">
                      <FiEdit3 className="text-md"></FiEdit3>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteBlog(blog?._id)}
                    className="bg-[#DD3333] rounded-md p-2"
                  >
                    <RiDeleteBin6Line className="text-md"></RiDeleteBin6Line>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[400px]">
          <h3 className="text-lg font-medium text-primary">
            {`You don't have create any blogs.`}
          </h3>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
