import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
const TaskManagementCards = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="border-2 border-[#D9D9D9] bg-[#ECECF8] rounded-xl px-2 md:px-5 py-2 space-y-4">
      <div className="flex items-center justify-between ">
        <div>
          {" "}
          <h2 className="text-[18px] font-bold">
            {" "}
            Write Code for New Feature or <br /> Application
          </h2>
        </div>

        <div className="relative ">
          <div
            className="text-white bg-primary p-2 rounded-lg cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <HiDotsVertical />
          </div>
          <div
            className={`absolute z-[3] right-6 w-12 bg-white text-white drop-shadow-lg rounded-lg p-2 ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <div className="bg-primary w-8 h-7 cursor-pointer mx-auto rounded-md flex items-center justify-center">
              <FiEdit3 className="text-md"></FiEdit3>
            </div>

            <Link className="rounded-xl bg-[#433EBE]">
              <div className="bg-primary w-8 h-7 cursor-pointer mx-auto rounded-md flex items-center justify-center mt-2">
                <RiDeleteBin6Line className="text-md"></RiDeleteBin6Line>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center py-2">
        <div>
          {" "}
          <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold">
            {" "}
            6 feb - 21 feb
          </span>
        </div>

        <div>
          <div className="avatar-group -space-x-6 rtl:space-x-reverse">
            <div className="avatar">
              <div className="w-12">
                <img src="https://i.ibb.co/DRqXm4r/395687920-750115476879631-8529659874036745582-n.jpg" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src="https://i.ibb.co/ZhFn0Ph/profile-pic-6.png" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src="https://i.ibb.co/tLN9ddt/prflPic.jpg" />
              </div>
            </div>
            <div className="avatar placeholder">
              <div className="w-12 bg-white text-primary">
                <span>+3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagementCards;
