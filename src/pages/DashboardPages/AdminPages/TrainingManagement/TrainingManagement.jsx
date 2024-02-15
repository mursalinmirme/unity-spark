import { BsClock } from "react-icons/bs";
import { FaCirclePlay, FaPlus } from "react-icons/fa6";
import useCourses from "../../../../hooks/useCourses";
import { Link } from "react-router-dom";


const TrainingManagement = () => {
    const [courses] = useCourses()

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-inter font-semibold">Manage Your Courses</h2>
                <Link to="/dashboard/training-management/add-new-course" className="flex gap-2 items-center py-2 px-3 border-2 border-primary rounded-lg text-sm font-inter font-semibold text-primary transition-all hover:text-white hover:bg-primary duration-500">
                    <span>Add New</span>
                    <FaPlus />
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-5">
                {
                    courses && courses?.map((course, idx) => (
                        <Link to={`/course/${course.id}`} key={idx} className="border-2 border-[#46A3E1] rounded-xl overflow-hidden">
                            <img src="https://i.ibb.co/3RMT44t/excel-live-crash-course-thumbnail.jpg" alt="course-img" className="rounded-t-lg w-full overflow-hidden" />
                            <div className="space-y-5 p-4">
                                <h1 className="text-2xl font-bold">Microsoft Excel: Beginner to Advanced LIVE Crash Course</h1>
                                <div className="flex items-center justify-start gap-5 mt-4">
                                    <div className="bg-[#BBDDF4] px-2.5  flex items-center gap-2 rounded-lg">
                                        <FaCirclePlay className="text-[#46A3e1] text-lg bg-white rounded-full"></FaCirclePlay>
                                        <h1 className="text-lg font-medium text-[#46A3e1]">40 Lessons</h1>
                                    </div>
                                    <div className="bg-[#BBDDF4] px-2.5 flex items-center gap-2 rounded-lg">
                                        <BsClock className="text-[#46A3e1] text-lg "></BsClock>
                                        <h1 className="text-lg font-medium text-[#46A3e1]">240 Hour</h1>
                                    </div>
                                    
                                </div>
                                <button className="px-6 py-3 bg-[#433EBE] text-white font-semibold text-xl rounded-xl">Enroll Now</button>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default TrainingManagement;