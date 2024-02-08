import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
const TaskManagementCards = ({ item, handleDelete, handleEditTask }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { _id, task_name, start_date, end_date, employees } = item || {};
  console.log(employees.length);

  return (
    <div className="border-2 border-[#D9D9D9] bg-[#ECECF8] rounded-xl p-2 py-3 md:px-5 space-y-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-[18px] font-bold">{task_name}</h2>
        </div>
        <div className="relative dropdown dropdown-hover dropdown-left">
          <div tabIndex={0} className="btn btn-sm btn-ghost">
            <HiDotsVertical className="text-primary text-lg" />
          </div>
          <div
            tabIndex={0}
            className="absolute -mr-2 mt-6 z-[1] rounded-lg card-compact dropdown-content w-12 bg-base-100 shadow"
          >
            <div className="p-2 text-white space-y-1">
              <div onClick={()=>handleEditTask(_id)} className="bg-primary p-2 cursor-pointer rounded-md flex items-center justify-center">
                <FiEdit3 className="text-md"></FiEdit3>
              </div>
              <div onClick={()=>handleDelete(_id)} className="bg-primary p-2 cursor-pointer rounded-md flex items-center justify-center">
                <RiDeleteBin6Line className="text-md"></RiDeleteBin6Line>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="relative mt-1">
          <div
            className="text-primary text-xl cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <HiDotsVertical />
          </div>
          <div
            className={`absolute z-[3] right-4 w-12 bg-white text-white drop-shadow-lg rounded-lg p-2 ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <div className="bg-primary p-2 cursor-pointer mx-auto rounded-md flex items-center justify-center">
              <FiEdit3 className="text-md"></FiEdit3>
            </div>
            <div className="bg-primary p-2 cursor-pointer rounded-md flex items-center justify-center mt-2">
              <RiDeleteBin6Line className="text-md"></RiDeleteBin6Line>
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex justify-between items-center py-2">
        <div>
          {" "}
          <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold">
            {" "}
            {start_date} - {end_date}
          </span>
        </div>
        <div>
          <div className="avatar-group -space-x-6 rtl:space-x-reverse">
            {employees?.length > 3
              ? employees?.slice(0, 3)?.map((employee, index) => (
                  <div key={index} className="w-12 h-12 avatar">
                    <img key={index} src={employee.image} />
                  </div>
                ))
              : employees?.map((employee, index) => (
                  <div key={index} className="w-12 h-12 avatar">
                    <img key={index} src={employee.image} />
                  </div>
                ))}
            {employees?.length > 3 && (
              <div className="avatar placeholder">
                <div className="w-10 bg-white text-primary">
                  <span className="font-semibold">
                    {employees?.slice(3, 10).length}+
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagementCards;
