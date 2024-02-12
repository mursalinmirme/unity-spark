import { BsClock } from "react-icons/bs";
import { FaCirclePlay } from "react-icons/fa6";


const TrainingManagement = () => {
    return (
        <div>
        {/* second card */}
        <div className="w-96  border-2 border-[#46A3E1] rounded-xl overflow-hidden">
                <img src="https://i.ibb.co/3RMT44t/excel-live-crash-course-thumbnail.jpg" alt="course-img" className="rounded-t-lg w-96 overflow-hidden" />
                <div className="space-y-5 p-4">
                    <h1 className="text-2xl font-bold">Microsoft Excel: Beginner to Advanced LIVE Crash Course</h1>
                    <div className="flex items-center justify-start gap-5 mt-4">
                            <button className="bg-[#BBDDF4] px-2.5  flex items-center gap-2 rounded-lg">
                               <FaCirclePlay className="text-[#46A3e1] text-lg bg-white rounded-full"></FaCirclePlay>
                               <h1 className="text-lg font-medium text-[#46A3e1]">40 Lessons</h1>
                            </button>
                            <button className="bg-[#BBDDF4] px-2.5 flex items-center gap-2 rounded-lg">
                               <BsClock className="text-[#46A3e1] text-lg "></BsClock>
                               <h1 className="text-lg font-medium text-[#46A3e1]">240 Hour</h1>
                            </button>
                            
                        </div>

                        <button className="px-6 py-3 bg-[#433EBE] text-white font-semibold text-xl rounded-xl">Enroll Now</button>
                </div>
              </div>
              {/* second card */}
        </div>
    );
};

export default TrainingManagement;