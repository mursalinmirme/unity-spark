import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
const TaskManagementCards = ({ item, handleDelete, handleEditTask }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { _id, task_name, start_date, end_date, employees } = item || {};

  return (
    <div className="border-2 border-[#D9D9D9] bg-[#ECECF8] rounded-xl p-2 py-3 md:px-5 space-y-4">
      <div className="flex justify-between">
        <h2 className="text-[18px] font-bold">{task_name}</h2>
        <div className="relative dropdown dropdown-hover dropdown-left">
          <div tabIndex={0} className="btn btn-sm btn-ghost">
            <HiDotsVertical className="text-primary text-lg" />
          </div>
          <div
            tabIndex={0}
            className="absolute -mr-2 mt-6 z-[1] rounded-lg card-compact dropdown-content w-12 bg-base-100 shadow"
          >
            <div className="p-2 text-white space-y-1">
              <div
                onClick={() => handleEditTask(_id)}
                className="bg-primary p-2 cursor-pointer rounded-md flex items-center justify-center"
              >
                <FiEdit3 className="text-md"></FiEdit3>
              </div>
              <div
                onClick={() => handleDelete(_id)}
                className="bg-[#DD3333] p-2 cursor-pointer rounded-md flex items-center justify-center"
              >
                <RiDeleteBin6Line className="text-md"></RiDeleteBin6Line>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex justify-between items-center py-2 mt-auto">
        <div className="mb-5 md:mb-0">
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
