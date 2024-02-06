import { CiClock2 } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { PiMicrophoneStageThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const EventCard = () => {
    const axiosPublic = useAxiosPublic()
    const {data: events = []} = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await axiosPublic.get('/events')
            return res?.data
        }
    })
    return (
        <div className="grid grid-cols-3 items-center justify-items-center gap-5">
        {events.map(items =>     <div key={items?._id} className=" bg-white border border-[#D9D9D9] overflow-hidden my-5 rounded-2xl">
            <img src={items?.image} alt="" className="!-z-10" />
            <div className="p-5 space-y-3 -mt-4 !z-10 rounded-t-2xl bg-white">
                <h1 className="font-semibold text-[23px]">{items?.eventName}</h1>
                <h1 className="text-xl font-medium flex  items-center gap-5"><CiClock2 className="text-2xl"></CiClock2>{items?.starting_time} - {items?.ending_time}</h1>
                <h1 className="text-xl font-medium flex  items-center gap-5"><CiCalendar className="text-2xl"></CiCalendar>{items?.date}</h1>
                <h1 className="text-xl font-medium flex  items-center gap-5"><PiMicrophoneStageThin className="text-2xl"></PiMicrophoneStageThin>{items?.hostName}</h1>
                <div className="pt-4">
            <Link to="/signup" className="nbtn">Register Now</Link>
            </div>
            </div>
            
           
        </div>)}
        </div>
    );
};

export default EventCard;