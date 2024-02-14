import { FaCirclePlay } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { BsClock } from "react-icons/bs";
import axios from "axios";

const MyCourse = () => {
 
    const { data: my_course = []} = useQuery({
        queryKey: ["my_coursesxxxx"],
        queryFn: async () => {
          const res = await axios.get("/my_course.json");
          console.log(res.data);
          return res.data;
        },
    });
    console.log(my_course)
    
    return (
        <div className="my-5">
         <div className="grid grid-cols-2 items-center gap-5">
         {
                my_course?.map(info => <div key={info.id} className="border-2 border-[#46A3E1] rounded-xl overflow-hidden h-[500px]">
                    <img src={info?.image} alt="course-img" className="rounded-t-lg w-full overflow-hidden" />
                    <div className="space-y-5 flex flex-col justify-between p-4 h-full max-h-[270px]">
                       <div>
                       <h1 className="text-2xl font-bold">{info?.title}</h1>
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
                       </div>
    
                           <div>
                           <button className="px-6 py-3 bg-[#433EBE] text-white font-semibold text-xl rounded-xl">Continue</button>
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