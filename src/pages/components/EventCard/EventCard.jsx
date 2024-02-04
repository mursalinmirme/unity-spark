import { CiClock2 } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { PiMicrophoneStageThin } from "react-icons/pi";
import { Link } from "react-router-dom";
const EventCard = () => {
    return (
        <div className="max-w-[375px] bg-white border border-[#D9D9D9] rounded-lg my-5">
            <img src="https://i.ibb.co/sCRZ6PT/jason-goodman-vbxy-Fxlgpj-M-unsplash.jpg" alt="" />
            <div className="p-5 space-y-3">
                <h1 className="font-semibold text-[23px]">CodeSphere Conference</h1>
                <h1 className="text-xl font-medium flex  items-center gap-5"><CiClock2 className="text-2xl"></CiClock2>10:00 AM - 12:00 PM</h1>
                <h1 className="text-xl font-medium flex  items-center gap-5"><CiCalendar className="text-2xl"></CiCalendar>11 February, 2024</h1>
                <h1 className="text-xl font-medium flex  items-center gap-5"><PiMicrophoneStageThin className="text-2xl"></PiMicrophoneStageThin>Mr. Sakib Khan</h1>
            </div>
            <div className="px-3 pb-6">
            <Link to="/signup" className="nbtn">Register Now</Link>
            </div>
           
        </div>
    );
};

export default EventCard;