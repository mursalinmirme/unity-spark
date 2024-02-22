import { useState } from "react";
import { useForm } from "react-hook-form";
import { SlCloudUpload } from "react-icons/sl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendar } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import useTimePicker from "../../../../hooks/useTimePicker";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;
const AddEvent = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const timeStart = useTimePicker(selectedStartTime || null);
  const timeEnd = useTimePicker(selectedEndTime || null);
  //   console.log(selectDate);

  // Year and month day convert

  const date = new Date(selectDate);

  const day = date.getDate();
  const month = date.toLocaleString("en", { month: "long" });
  const year = date.getFullYear();
  let deted = `${day},${month}, ${year}`;

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
      toast.success("Event Add Successfully");

      const userInfo = {
        eventName: data?.name,
        starting_time: timeStart,
        ending_time: timeEnd,
        date: deted,
        hostName: data?.hostName,
        image: res.data.data.display_url,
      };
      console.log(userInfo);
      axiosPublic
        .post("/events", userInfo)
        .then((res) => {
          console.log(res.data);
          reset();
        })
        .catch((error) => {
          console.log("Event post error", error);
        });
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl mt-5">Add New Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3 space-y-4">
        {/**First Two Part */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Email field */}
          <label className="flex-1">
            <div className="py-0">
              <span className="font-medium font-inter text-base">Event Name:</span>
            </div>
            <input
              type="text"
              className="text-base py-2 font-medium"
              {...register("name")}
              placeholder="Enter your event name"
              required
            />
          </label>
          {/* email field End */}

          {/*image field */}
          <label className="relative flex-1 p-0 mb-0.5">
          <p className="font-medium text-base font-inter pb-4 md:pb-0 md:mb-10 lg:mb-10 ">
                Event Photo :
              </p>
            <div className="label mb-10 md:mb-0 lg:mb-0 p-0">
              <label
                className="font-semibold w-full absolute bottom-0  text-white cursor-pointer font-inter text-base px-8 py-2 bg-primary rounded-md transition-all duration-500 text-[15px]"
                htmlFor="user_photo"
              >
                <div className="flex justify-center items-center gap-4">
                  {/* <img className="w-5 h-5" src={download_icon} alt="" />{" "} */}
                  <SlCloudUpload className="w-5 h-5" />
                  <span>Upload Photo</span>
                </div>
              </label>
            </div>
            <input
              className="hidden"
              id="user_photo"
              type="file"
              {...register("photo")}
              placeholder="N/A"
            />
          </label>
        </div>

        {/**Second Two Part */}
        <div className="grid md:grid-cols-2 gap-3">
          {/* Current Address field */}
          <label>
            <div className="">
              <span className="font-inter text-base font-medium">Start Time:</span>
            </div>
            <div className="relative">
              <DatePicker
                value={selectedStartTime || "Please Select Start Time"}
                selected={selectedStartTime}
                onChange={(time) => setSelectedStartTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                required
                dateFormat="h:mm aa"
                className="text-base font-medium py-2"
              />
              <IoMdTime className="absolute top-4 lg:top-4 text-2xl right-4 cursor-pointer" />
            </div>
          </label>
          {/* Current Address field End */}

          {/* Permanent Address */}
          <label>
            <div className="">
              <span className="font-medium text-base font-inter">End Time</span>
            </div>
            <div className="relative">
              <DatePicker
                value={selectedEndTime || "Please End Time Select"}
                selected={selectedEndTime}
                onChange={(time) => setSelectedEndTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                required
                dateFormat="h:mm aa"
                className="text-base font-medium py-2"
              />
              <IoMdTime className="absolute text-2xl top-4 lg:top-4 right-4 cursor-pointer" />
            </div>
          </label>
        </div>

        {/**Third Two Part */}
        <div className="grid md:grid-cols-2 gap-3 pb-3">
          {/*  Host Name field */}
          <label>
            <div className="">
              <span className="font-medium text-base font-inter">Host Name:</span>
            </div>
            <input
              type="text"
              {...register("hostName")}
              placeholder="Enter host name"
              className="text-base font-medium py-2"
            />
          </label>
          {/* Your Host Name  field End */}

          {/*Event Date */}
          <label>
            <div className="">
              <span className="font-medium text-base font-inter">Event Date</span>
            </div>

            <div className="relative">
              <DatePicker
                selected={selectDate}
                onChange={(date) => setSelectDate(date)}
                icon="fa fa-calendar"
                className="text-base font-medium py-2"
              />
              <CiCalendar className="absolute top-4 lg:top-4 right-4 cursor-pointer" />
            </div>
          </label>
        </div>

        <div className="w-40  bg-accent border-none text-white rounded-lg text-center cursor-pointer">
          {updateLoading ? (
            <span className="loading loading-spinner loading-md "></span>
          ) : (
            <input
              className="border-none cursor-pointer py-3 font-semibold text-base"
              type="submit"
              value="Submit Event"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
