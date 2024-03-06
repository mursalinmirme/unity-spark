import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import moment from "moment";
const TaskManagementCards = ({
  item,
  handleDelete,
  handleEditTask,
  hanleModalShow,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { _id, task_name, start_date, end_date, employees } = item || {};

  const startDate = moment(start_date);
  const endDate = moment(end_date);
  const formattedStartDate = startDate.format("DD MMM");
  const formattedEndDate = endDate.format("DD MMM");
  const [show, setShow] = useState(false);
  return (
    <div className="border-2 border-primary bg-[#ECECF8] rounded-xl p-2 py-3 md:px-5 space-y-4">
      <div className="flex justify-between">
        <h2 className="text-[18px] font-semibold font-inter">{task_name}</h2>
        <div
          onClick={() => setShow(!show)}
          className="relative dropdown dropdown-left"
        >
          {show ? (
            <div tabIndex={0} className="btn btn-sm btn-ghost">
              <p className="text-red-600 text-lg px-0.5">X</p>
            </div>
          ) : (
            <div tabIndex={0} className="btn btn-sm btn-ghost">
              <HiDotsVertical className="text-primary text-lg" />
            </div>
          )}

          {/** just only true or false condition  */}
          {show ? (
            <div
              tabIndex={0}
              className="absolute -mr-2 mt-6 z-[1] rounded-lg card-compact dropdown-content w-12 bg-base-100 shadow"
            >
              <div className="p-2 text-white space-y-1">
                <div
                  onClick={() => hanleModalShow(_id)}
                  className="bg-primary p-1.5 cursor-pointer rounded-md flex items-center justify-center"
                >
                  <BsEye className="text-lg"></BsEye>
                </div>
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
          ) : (
            <p> </p>
          )}
        </div>
      </div>
      <div className="md:flex justify-between items-center py-2 mt-auto">
        <div className="mb-5 md:mb-0">
          {" "}
          <span className="border px-4 bg-[#c7c5eb] p-1 font-inter rounded-lg text-[#433EBE] font-semibold">
            {" "}
            {formattedStartDate} - {formattedEndDate}
          </span>
        </div>
        <div>
          <div className="avatar-group -space-x-4 rtl:space-x-reverse">
            {employees?.length > 3
              ? employees?.slice(0, 3)?.map((employee, index) => (
                  <div key={index} className="w-[45px] h-[45px] avatar">
                    <img key={index} src={employee.image} />
                  </div>
                ))
              : employees?.map((employee, index) => (
                  <div key={index} className="w-[45px] h-[45px] avatar">
                    <img key={index} src={employee.image} />
                  </div>
                ))}
            {employees?.length > 3 && (
              <div className="avatar placeholder">
                <div className="h-[38px] w-[38px] bg-white text-primary">
                  <span className="font-semibold">{employees.length - 3}+</span>
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
