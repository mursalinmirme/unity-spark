import { useState } from "react";
import { useForm } from "react-hook-form";
import { SlCloudUpload } from "react-icons/sl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendar } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import useTimePicker from "../../../../hooks/useTimePicker";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import axios from "axios";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;
const AddEvent = () => {
  const { register, handleSubmit, reset } = useForm();
  const [selectDate, setSelectDate] = useState(new Date());
  const axiosPublic = useAxiosPublic();
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

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
    const imageFile = { image: data.photo[0] };
    const res = await axiosPublic.post(image_Hosting_Api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const userInfo = {
        eventName: data?.name,
        timedStart: timeStart,
        timeEnd: timeEnd,
        dateS: deted,
        hostName: data?.hostName,
        image: res.data.data.display_url,
      };
      console.log(userInfo);
      toast.success("Successfully form Insert");
    }
  };

  return (
    <div>
      <h2 className="text-center font-bold text-3xl text-primary">
        {" "}
        Add Event
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-4">
        {/**First Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Email field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> Your Event Name:</span>
            </div>
            <input
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
                className="font-semibold w-full absolute bottom-0   text-white cursor-pointer font-inter text-base px-8 py-[8px] bg-primary rounded-md transition-all duration-500 text-[15px]"
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
              {...register("photo")}
              placeholder="N/A"
            />
          </label>
        </div>

        {/**Second Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Current Address field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> Your Start Time:</span>
            </div>
            <div className="relative">
              <DatePicker
                className="px-64 lg:px-[230px] !pl-2"
                value={selectedStartTime || "Please Select Start Time "}
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
                className="px-64 lg:px-[230px] !pl-2"
                value={selectedEndTime || "Please End Time Select"}
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

        {/**Third Two Part */}
        <div className="grid md:grid-cols-2 gap-2 mb-12">
          {/*  Host Name field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> Your Host Name:</span>
            </div>
            <input
              type="text"
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
                className="px-64 lg:px-64 !pl-2"
                selected={selectDate}
                onChange={(date) => setSelectDate(date)}
                icon="fa fa-calendar"
              />
              <CiCalendar className="absolute top-4 lg:top-4 right-4 cursor-pointer" />
            </div>
          </label>
        </div>

        <button className=" bg-primary text-white  px-7 py-2 rounded-lg">
          {" "}
          Insert Event{" "}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
