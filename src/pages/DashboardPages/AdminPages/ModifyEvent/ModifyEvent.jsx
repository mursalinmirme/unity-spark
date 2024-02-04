import { CiCalendar, CiClock2 } from "react-icons/ci";
import { PiMicrophoneStageThin } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";


const ModifyEvent = () => {
    return (
        <div>
            <div className="max-w-[375px] bg-white border border-[#433EBE] rounded-lg my-5">
            <div className="p-5 space-y-3">
                <h1 className="font-semibold text-[23px]">CodeSphere Conference</h1>
                <h1 className="text-xl font-medium flex  items-center gap-5"><CiClock2 className="text-2xl"></CiClock2>10:00 AM - 12:00 PM</h1>
                <h1 className="text-xl font-medium flex  items-center gap-5"><CiCalendar className="text-2xl"></CiCalendar>11 February, 2024</h1>
                <h1 className="text-xl font-medium flex  items-center gap-5"><PiMicrophoneStageThin className="text-2xl"></PiMicrophoneStageThin>Mr. Sakib Khan</h1>
            </div>
            <div className="px-3 pb-6 flex justify-center items-center gap-6">

                <button className="bg-primary rounded-lg p-2 text-white"><MdEditDocument className="text-xl"/></button>
                <button className="bg-primary rounded-lg p-2 text-white"><MdDeleteForever className="text-xl"/></button>
            
            </div>
           
        </div>
        </div>
    );
};

export default ModifyEvent;