import { FaPlus } from "react-icons/fa6";
import useCourses from "../../../../hooks/useCourses";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { toast } from "sonner";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import TrainingManagementSkeleton from "./TrainingManagementSkeleton";

const TrainingManagement = () => {
  const axiosPublic = useAxiosPublic();
  const [courses, , refetch, isFetching] = useCourses();

  const handleDeleteCourse = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/courses/${id}`).then((res) => {
          console.log(res.data);
          toast.success("Successfully deleted");
          refetch();
        });
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold">Manage Courses</h2>
        <Link
          to="/dashboard/training-management/add-new-course"
          className="edit_btn"
        >
          <span>Add New</span>
          <FaPlus />
        </Link>
      </div>
      <table className="table border mt-8 ">
        <thead className="bg-second text-white text-base md:text-[18px] rounded-md">
          <tr>
            <th>SL</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        {isFetching ? (
          <TrainingManagementSkeleton></TrainingManagementSkeleton>
        ) : (
          <tbody className="mt-20">
            {courses?.map((course, idx) => (
              <tr key={idx}>
                <td className="text-left">
                  <h3 className="text-lg font-semibold">{idx + 1}</h3>
                </td>
                <td className="text-left">
                  <h2 className="font-inter text-base min-w-80 md:min-w-full md:text-xl font-semibold">
                    {course?.title}
                  </h2>
                </td>
                <td className="text-left flex items-center gap-3 md:gap-3">
                  <Link to={`/course/${course?._id}`}>
                    <GrView className="text-3xl border-2 p-1 rounded-xl text-primary border-primary hover:bg-primary cursor-pointer hover:text-white transition-all" />
                  </Link>
                  <Link to={`/dashboard/update-course/${course?._id}`}>
                    <FiEdit2 className="text-3xl border-2 p-1 rounded-xl text-primary border-primary hover:bg-primary cursor-pointer hover:text-white transition-all" />
                  </Link>

                  <FiTrash
                    onClick={() => handleDeleteCourse(course?._id)}
                    className="text-3xl border-2 p-1 rounded-xl text-red-500 border-red-500 hover:bg-red-500 cursor-pointer hover:text-white transition-all"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TrainingManagement;
