import { CiCalendar, CiClock2 } from "react-icons/ci";
import { PiMicrophoneStageThin } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useState } from "react";


const ModifyEvent = () => {
    const axiosPublic = useAxiosPublic()
    
    const [isOpen , setisOpen] = useState(false)
    const handleDelete = (id) =>{
            console.log(id)
    }

    return (
        <div>
            <div className="max-w-[375px] bg-white border border-[#433EBE] rounded-lg my-5 relative">
                <IoIosArrowDropdown className={`absolute top-7 text-2xl font-medium right-2 transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} onClick={() => setisOpen(!isOpen)}/>
                <h1 className="font-semibold text-[23px] p-5">CodeSphere Conference</h1>
          <div className={`${isOpen ? "block" : "hidden" }`}>
          <div className="p-5 space-y-3">
                
                <h1 className="text-xl font-medium flex  items-center gap-5"><CiClock2 className="text-2xl"></CiClock2>10:00 AM - 12:00 PM</h1>
                <h1 className="text-xl font-medium flex  items-center gap-5"><CiCalendar className="text-2xl"></CiCalendar>11 February, 2024</h1>
                <h1 className="text-xl font-medium flex  items-center gap-5"><PiMicrophoneStageThin className="text-2xl"></PiMicrophoneStageThin>Mr. Sakib Khan</h1>
                <div className=" pb-6 flex  items-center gap-6">

                <button className="bg-primary rounded-lg p-2 text-white"><MdEditDocument className="text-xl"/></button>
                <button onClick={() => handleDelete()} className="bg-primary rounded-lg p-2 text-white"><MdDeleteForever className="text-xl"/></button>
            
            </div>
            </div>
            
          </div>
           
        </div>
        </div>
    );
};

export default ModifyEvent;