import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendar } from "react-icons/ci";
// import { PiMicrophoneStageThin } from "react-icons/pi";
// import { MdEditDocument } from "react-icons/md";
// import { MdDeleteForever } from "react-icons/md";
import {  IoMdTime } from "react-icons/io";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { SlCloudUpload } from "react-icons/sl";
import useTimePicker from "../../../../hooks/useTimePicker";
import axios from "axios";
import ModifyEventCard from "./ModifyEventCard";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;


const ModifyEvent = () => {
  // const [isOpen , setisOpen] = useState(false)
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [currentId, setcurrentId] = useState([]);

    const axiosPublic = useAxiosPublic()
    const {data: events = [], refetch} = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await axiosPublic.get('/events')
            return res?.data
        }
    })
    const {data: eventsId = []} = useQuery({
      queryKey: ['eventsId' , currentId],
      enabled: !!currentId,
      queryFn: async () => {
          const res = await axiosPublic.get(`/events/${currentId}`)
          return res?.data
      }
    
  })
  console.log(eventsId);


    const timeStart = useTimePicker(selectedStartTime || null);
    const timeEnd = useTimePicker(selectedEndTime || null);
    //   console.log(selectDate);
  
    // Year and month day convert
    const date = new Date(selectDate);
    const day = date.getDate();
    const month = date.toLocaleString("en", { month: "long" });
    const year = date.getFullYear();
    let dated = `${day},${month}, ${year}`;

   
    // updated data
    const { register, handleSubmit , reset } = useForm()
     const onSubmit = async (data) => {
    setUpdateLoading(true);
    const imageFile = { image: data.photo[0] };
    const res = await axios.post(image_Hosting_Api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      setUpdateLoading(false);
      

      const userInfo = {
        eventName: data?.name,
        starting_time: timeStart,
        ending_time: timeEnd,
        date: dated,
        hostName: data?.hostName,
        image: res.data.data.display_url,
      };
      console.log(userInfo);
      
        axiosPublic.put(`/events/${currentId}` , userInfo)
        .then(res => {
            if(res?.data?.modifiedCount > 0){
                toast.success("Event Updated")
                reset()
              
            }
        })
        .catch(error => {
            console.log(error)
            toast.error(error)
        })
    

    }
  }

   
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
      .catch(error => {
          toast.error(error)
          console.log(error)
      })
  }
  const handlemodalopen = (id) => {
    document.getElementById('my_modal_3').showModal()
    setcurrentId(id)
  }

    return (
        <div className="flex items-start justify-items-center gap-5">
       {events.map(items => <ModifyEventCard key={items._id} items={items} handleDelete={handleDelete} handlemodalopen={handlemodalopen} ></ModifyEventCard> )}
        <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
          {/* Email field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> Your Event Name:</span>
            </div>
            <input
            defaultValue={eventsId?.eventName}
              type="text"
              {...register("name")}
              placeholder="Please Add Event Name"
              required
            />
          </label>
          {/* email field End */}

          {/*image field */}
          <label className="relative">
            <div className="label mb-10 md:mb-0 lg:mb-0">
              <span className="font-bold font-inter"> Your Event Photo : </span>
              <label
                className="font-semibold w-full absolute bottom-0  text-white cursor-pointer font-inter text-base px-8 py-[8px] bg-primary rounded-md transition-all duration-500 text-[15px]"
                htmlFor="user_photo"
              >
                <div className="flex justify-center items-center gap-4">
                  {" "}
                  {/* <img className="w-5 h-5" src={download_icon} alt="" />{" "} */}
                  <SlCloudUpload className="w-5 h-5" />
                  <span> Upload Photo</span>{" "}
                </div>
              </label>
            </div>
            <input
              className="hidden"
              id="user_photo"
              type="file"
              defaultValue={eventsId?.image}
              {...register("photo")}
              placeholder="N/A"
            />
          </label>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
          {/* Current Address field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> Your Start Time:</span>
            </div>
            <div className="relative">
              <DatePicker
                
                value={selectedStartTime || eventsId?.starting_time}
                selected={selectedStartTime}
                onChange={(time) => setSelectedStartTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                required
                dateFormat="h:mm aa"
              />
              <IoMdTime className="absolute top-4 lg:top-4 right-4 cursor-pointer" />
            </div>
          </label>
          {/* Current Address field End */}

          {/* Permanent Address */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter">Your End Time</span>
            </div>
            <div className="relative">
              <DatePicker
                
                value={selectedEndTime || eventsId?.ending_time}
                selected={selectedEndTime}
                onChange={(time) => setSelectedEndTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                required
                dateFormat="h:mm aa"
              />
              <IoMdTime className="absolute top-4 lg:top-4 right-4 cursor-pointer" />
            </div>
          </label>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 pb-3">
          {/*  Host Name field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> Your Host Name:</span>
            </div>
            <input
              type="text"
              defaultValue={eventsId?.hostName}
              {...register("hostName")}
              placeholder="Your Host Name"
            />
          </label>
          {/* Your Host Name  field End */}

          {/*Event Date */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter">Your Event Date</span>
            </div>

            <div className="relative">
              <DatePicker
               
                selected={selectDate}
                onChange={(date) => setSelectDate(date)}
                icon="fa fa-calendar"
              />
              <CiCalendar className="absolute top-4 lg:top-4 right-4 cursor-pointer" />
            </div>
          </label>
                     </div>
                     <div className="w-48  bg-primary border-none text-white rounded-xl text-center cursor-pointer">
          {updateLoading ? (
            <span className="loading loading-spinner loading-md "></span>
          ) : (
            <input 
              className="border-none cursor-pointer py-3 font-semibold text-base"
              type="submit"
              value="Insert Event"
            />
          )}
        </div>
                  </form>
                  </div>
                </dialog>
        </div>
    );
};

export default ModifyEvent;