/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { LuTrash } from "react-icons/lu";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { HiOutlineEye } from "react-icons/hi2";
import Swal from "sweetalert2";
import moment from "moment";

const SavedBlogCard = ({ singleBlog , refetch }) => {
  const timestamp = singleBlog?.blogInfo?.createdAt;
  const timeDifference = moment(timestamp).fromNow();
  console.log(timeDifference)
  const axiosPublic = useAxiosPublic()
  console.log(singleBlog);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed){
   axiosPublic.delete(`/bookmarked-blogs/${id}`)
   .then(res => {
    if(res?.data?.deletedCount > 0){
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      refetch()
    }
   })
   .catch(error => {
    console.log(error.message)
   })
      }
    });
  }
  console.log(singleBlog?.blogInfo?.title.length)
  return (
    <div className="rounded-xl px-5 py-3 bg-slate-100 border border-slate-500">
      <div>
        <h2 className="mt-3 text-lg font-semibold">
          {singleBlog?.blogInfo?.title.length > 50
            ? singleBlog?.blogInfo?.title.slice(0, 50) + "..."
            : singleBlog?.blogInfo?.title}
        </h2>

        <h2 className="my-2 font-inter font-medium">
         Posted {timeDifference}
        </h2>

        <div className="flex gap-4 items-center mt-3">
        <Link className="p-1.5 rounded-lg border-2 text-primary border-primary hover:bg-primary hover:text-white transition" to={`/blog-details/${singleBlog?.blogInfo?._id}`}>
         <HiOutlineEye className="text-xl"></HiOutlineEye>
        </Link>
        <button className="p-1.5 rounded-lg border-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition" onClick={()=> handleDelete(singleBlog?._id)}>
            <LuTrash className="text-xl"></LuTrash>
        </button>
        </div>
      </div>
    </div>
  );
};

SavedBlogCard.propTypes = {
  singleBlog: PropTypes.object,
};

export default SavedBlogCard;
