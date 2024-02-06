import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import TaskManagementCards from "./TaskManagementCards";
import { useEffect, useState } from "react";
const TaskManagement = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl"> Tasks </h1>
        <Link
          to="/dashboard/addNewTask"
          className="flex items-center gap-1 cursor-pointer text-[#433ebe] font-inter font-semibold border-2 border-[#433ebe] p-1 md:px-2 rounded-lg hover:bg-primary hover:text-white"
        >
          <FaPlus /> <span>New Task</span>
        </Link>
      </div>
      <div className="my-5 grid grid-cols-1 md:grid-cols-2  gap-4 mt-10">
        {data?.map((item) => (
          <TaskManagementCards key={item.id} item={item}></TaskManagementCards>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
