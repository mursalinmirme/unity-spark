import { CiCalendar, CiClock2 } from "react-icons/ci";
import { PiMicrophoneStageThin } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const ModifyEvent = () => {
    const axiosPublic = useAxiosPublic()
    const {data: events = [], refetch} = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await axiosPublic.get('/events')
            return res?.data
        }
    })
    const [isOpen , setisOpen] = useState(false)
    const handleDelete = (id) =>{
        axiosPublic.delete(`/events/${id}`)
        .then(res => {
            console.log(res?.data)
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              })
              .then((result) => {
                if (result.isConfirmed) {
                  if(res.data.deletedCount > 0 ){
                    refetch()
                    Swal.fire({
                      title: "Deleted!",
                      text: "Event Deleted",
                      icon: "success"
                    });
                  }
                 
                }
              });
        })
    }

    return (
        <div className="grid grid-cols-3 items-center justify-items-center gap-5">
       {events.map(items =>  <div key={items._id} className="max-w-[375px] bg-white border border-[#433EBE] rounded-lg my-5 relative">
                <IoIosArrowDropdown className={`absolute top-7 text-2xl font-medium right-2 transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} onClick={() => setisOpen(!isOpen)}/>
                <h1 className="font-semibold text-[23px] p-5">{items?.eventName}</h1>
          <div className={`${isOpen ? "block" : "hidden" }`}>
          <div className="p-5 space-y-3">
                
                <h1 className="text-xl font-medium flex  items-center gap-5"><CiClock2 className="text-2xl"></CiClock2>{items?.starting_time} - {items?.ending_time}</h1>
                <h1 className="text-xl font-medium flex  items-center gap-5"><CiCalendar className="text-2xl"></CiCalendar>{items?.date}</h1>
                <h1 className="text-xl font-medium flex  items-center gap-5"><PiMicrophoneStageThin className="text-2xl"></PiMicrophoneStageThin>{items?.hostName}</h1>
                <div className=" pb-6 flex  items-center gap-6">

                <button className="bg-primary rounded-lg p-2 text-white"><MdEditDocument className="text-xl"/></button>
                <button onClick={() => handleDelete(items?._id)} className="bg-primary rounded-lg p-2 text-white"><MdDeleteForever className="text-xl"/></button>
            
            </div>
            </div>
            
          </div>
           
        </div>)}
        </div>
    );
};

export default ModifyEvent;