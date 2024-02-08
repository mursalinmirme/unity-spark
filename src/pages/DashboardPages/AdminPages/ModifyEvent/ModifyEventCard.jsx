/* eslint-disable react/prop-types */
import { useState } from "react";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import { IoIosArrowDropdown } from "react-icons/io";
import { MdDeleteForever, MdEditDocument } from "react-icons/md";
import { PiMicrophoneStageThin } from "react-icons/pi";

const ModifyEventCard = ({ items, handleDelete, handlemodalopen }) => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <div className="max-w-[375px] bg-white border border-[#433EBE] rounded-lg my-5 relative">
      <IoIosArrowDropdown
        className={`absolute top-7 text-2xl font-medium right-2 transition-all duration-300 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
        onClick={() => setisOpen(!isOpen)}
      />
      <h1 className="font-semibold text-[23px] p-5 pr-10">
        {items?.eventName}
      </h1>
      <div className={`${isOpen ? "block" : "hidden"}`}>
        <div className="p-5 space-y-3">
          <h1 className="text-xl font-medium flex  items-center gap-5">
            <CiClock2 className="text-2xl"></CiClock2>
            {items?.starting_time} - {items?.ending_time}
          </h1>
          <h1 className="text-xl font-medium flex  items-center gap-5">
            <CiCalendar className="text-2xl"></CiCalendar>
            {items?.date}
          </h1>
          <h1 className="text-xl font-medium flex  items-center gap-5">
            <PiMicrophoneStageThin className="text-2xl"></PiMicrophoneStageThin>
            {items?.hostName}
          </h1>
          <div className=" pb-6 flex  items-center gap-6">
            <button
              className="bg-primary rounded-lg p-2 text-white"
              onClick={() => handlemodalopen(items?._id)}
            >
              <MdEditDocument className="text-xl" />
            </button>
            <button
              onClick={() => handleDelete(items?._id)}
              className="bg-primary rounded-lg p-2 text-white"
            >
              <MdDeleteForever className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyEventCard;
