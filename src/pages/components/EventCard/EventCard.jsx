import { CiClock2 } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { PiMicrophoneStageThin } from "react-icons/pi";
const EventCard = () => {
    return (
        <div className="max-w-[375px] bg-white border border-[#D9D9D9] rounded-lg">
            <img src="https://i.ibb.co/sCRZ6PT/jason-goodman-vbxy-Fxlgpj-M-unsplash.jpg" alt="" />
            <div className="p-5">
                <h1 className="font-semibold text-[23px]">CodeSphere Conference</h1>
            </div>
        </div>
    );
};

export default EventCard;