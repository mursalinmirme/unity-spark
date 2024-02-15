import { FaPlus } from "react-icons/fa6";
import useCourses from "../../../../hooks/useCourses";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const TrainingManagement = () => {
    const axiosPublic = useAxiosPublic()
    const [courses , refetch] = useCourses()
    console.log(courses);
     // handle delete course
  const handleDeleteCourse = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/job-ads/${id}`).then((res) => {
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
                <h2 className="text-2xl font-inter font-semibold">Manage Your Courses</h2>
                <Link to="/dashboard/training-management/add-new-course" className="flex gap-2 items-center py-2 px-3 border-2 border-primary rounded-lg text-sm font-inter font-semibold text-primary transition-all hover:text-white hover:bg-primary duration-500">
                    <span>Add New</span>
                    <FaPlus />
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                {
                    courses && courses?.map((course, idx) => (
                        <Link to={`/course/${course.id}`} key={idx} className="border-2 border-[#46A3E1] rounded-xl overflow-hidden">
                            <img src={course?.image} alt="course-img" className="rounded-t-lg w-full overflow-hidden" />
                            <div className="space-y-5 p-4">
                                <h1 className="text-2xl font-bold">{course?.title}</h1>
                                <div className="flex items-center justify-start gap-5 mt-4">
                                    
                                    <button onClick={() => handleDeleteCourse(course?._id)} className="bg-[#DD3333] rounded-lg p-2 ">
                                        <RiDeleteBin6Line className="text-lg text-white"></RiDeleteBin6Line>
                                    </button>

                                    <button className="bg-[#DD3333] rounded-lg p-2">
                                      update
                                    </button>
                                    
                                </div>
                              
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default TrainingManagement;