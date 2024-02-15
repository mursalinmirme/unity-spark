import { FaCirclePlay } from "react-icons/fa6";
import { BsClock } from "react-icons/bs";
import { Link } from "react-router-dom";
import useMyCourses from "../../../../hooks/useMyCourses";

const MyCourse = () => {
    const [my_course] = useMyCourses()
    
    return (
        <div className="my-5">
         <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
         {
                my_course?.map(info => <div key={info?._id} className="border-2 border-[#46A3E1] rounded-xl overflow-hidden h-[500px]">
                    <img src={info?.uniqueID?.image} alt="course-img" className="rounded-t-lg w-full overflow-hidden" />
                    <div className="space-y-5 flex flex-col justify-between p-4 h-full max-h-[270px]">
                       <div>
                       <h1 className="text-2xl font-bold">{info?.uniqueID?.title}</h1>
                        <div className="flex items-center justify-start gap-5 mt-4">
                                <div className="bg-[#BBDDF4] px-2.5  flex items-center gap-2 rounded-lg">
                                   <FaCirclePlay className="text-[#46A3e1] text-lg bg-white rounded-full"></FaCirclePlay>
                                   <h1 className="text-lg font-medium text-[#46A3e1]">40 Lessons</h1>
                                </div>
                                <div className="bg-[#BBDDF4] px-2.5 flex items-center gap-2 rounded-lg">
                                   <BsClock className="text-[#46A3e1] text-lg"></BsClock>
                                   <h1 className="text-lg font-medium text-[#46A3e1]">240 Hour</h1>
                                </div>
                                
                            </div>
                       </div>    
                        <div>
                        <Link to={`/mycourse/${info?.uniqueID?._id}`} className="px-6 py-3  bg-[#433EBE] text-white font-semibold text-xl rounded-xl">Continue</Link>
                        </div>
                    </div>
                  </div>
                )
            }
         </div>
           
        </div>
    );
};

export default MyCourse;