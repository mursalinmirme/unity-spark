import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
const TaskManagementCards = ({ item }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { task_name, start_date, end_date, employees } = item || {};
  console.log(employees.length);

  return (
    <div className="border-2 border-[#D9D9D9] bg-[#ECECF8] rounded-xl p-2 py-3 md:px-5 space-y-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-[18px] font-bold">{task_name}</h2>
        </div>
        <div className="relative mt-1">
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
            {start_date} - {end_date}
          </span>
        </div>
        <div>
          <div className="avatar-group -space-x-6 rtl:space-x-reverse">
            {employees?.map((employee, idx) => (
              <div key={idx} className="avatar">
                <div className="w-10">
                  {Array.isArray(employee?.image) &&
                  employee.image.length > 3 ? (
                    employee.image
                      .slice(0, 3)
                      .map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Image ${index + 1}`}
                        />
                      ))
                  ) : (
                    <img src={employee?.image} alt="Employee Image" />
                  )}
                </div>
              </div>
            ))}
            {employees?.some(
              (employee) =>
                Array.isArray(employee?.image) && employee.image.length > 3
            ) && (
              <div className="avatar placeholder">
                <div className="w-12 bg-white text-primary">
                  <span className="font-bold">+3</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <div>
          <div className="avatar-group -space-x-6 rtl:space-x-reverse">
            {employees?.map((employee, idx) => (
              <div key={idx} className="avatar">
                <div className="w-10">
                  {employee?.length > 3 ? <img src={employee.image.slice(0,3)}/> : <img src={employee?.image} />}
                </div>
              </div>
            ))}
            {employees?.length > 3 && (
              <div className="avatar placeholder">
                <div className="w-12 bg-white text-primary">
                  <span className="font-bold">+3</span>
                </div>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TaskManagementCards;
