import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { LuPenLine } from "react-icons/lu";
import parse from "html-react-parser";

const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: blogs = [], refetch } = useQuery({
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

  return (
    <div>
      <div className="flex justify-end">
        <Link to="/dashboard/addBlogs">
          <p className="edit_btn">
            <LuPenLine></LuPenLine> <span>Add Blog</span>
          </p>
        </Link>
      </div>
      {blogs.length > 0 ? (
        <div className="min-h-[62vh]">
          {blogs?.map((blog) => {
            return (
              <div
                className="border-2 p-3 my-4 rounded-lg flex justify-between items-center"
                key={blog?._id}>
                <div>
                  <h3 className="text-base font-bold">{blog?.title}</h3>
                </div>
                <div className="space-x-4 text-white">
                  <Link to={`/dashboard/editBlogs/blogs/${blog?._id}`}>
                    <button className="bg-primary rounded-lg p-2">
                      <AiFillEdit className="text-lg"></AiFillEdit>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteBlog(blog?._id)}
                    className="bg-primary rounded-lg p-2 ">
                    <RiDeleteBin6Line className="text-lg"></RiDeleteBin6Line>
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
