import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import TaskManagementCards from "./TaskManagementCards";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import { MdDone } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
const TaskManagement = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [currentId, setcurrentId] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(true);

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tasks");
      return res.data;
    },
  });

  const { data: tasksId = [] } = useQuery({
    queryKey: ["tasksId", currentId],
    enabled: !!currentId,
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks/${currentId}`);
      return res.data;
    },
  });
  console.log(tasksId);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const updatedTask = {
      task_name: data.taskName,
      starts_date: data.startDate,
      end_date: data.endDate,
      employees: selectedEmployees,
    };
    console.log(updatedTask);
    axiosPublic.put(`/tasks/${currentId}`, updatedTask).then((res) => {
      if (res?.data?.modifiedCount > 0) {
        toast.success("Task Updated");
        reset();
        refetch();
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this applicants!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/tasks/${id}`).then((res) => {
          console.log(res.data);
          toast.success("Task successfully deleted");
          refetch();
        });
      }
    });
  };

  const handleEditTask = (id) => {
    document.getElementById("my_modal_3").showModal();
    setcurrentId(id);
  };

  const SelectUnselectButton = ({ item }) => {
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const isSelected = selectedEmployees.some((emp) => emp._id === item._id);
    console.log(isSelected);

    const handleClick = () => {
      if (isSelected) {
        const updatedEmployees = selectedEmployees.filter(
          (emp) => emp._id !== item._id
        );
        setSelectedEmployees(updatedEmployees);
      } else {
        setSelectedEmployees([
          ...selectedEmployees,
          {
            _id: item._id,
            name: item.name,
            email: item.email,
            image: item.image,
            position: item.position,
          },
        ]);
      }
    };

    console.log(selectedEmployees);

    return (
      <div className="cursor-pointer text-white text-3xl" onClick={handleClick}>
        {isSelected ? (
          <MdDone className="bg-primary p-1 mr-1 rounded-full" />
        ) : (
          <IoAdd className="bg-primary p-1 mr-1 rounded-full" />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl"> Tasks </h1>
        <Link to="/dashboard/addNewTask">
          <a className="edit_btn">
            <FaPlus /> <span>New Task</span>
          </a>
        </Link>
      </div>
      <div className="my-5 grid grid-cols-1 md:grid-cols-2  gap-4 mt-7">
        {tasks?.map((item) => (
          <TaskManagementCards
            key={item.id}
            item={item}
            handleEditTask={handleEditTask}
            handleDelete={handleDelete}
          ></TaskManagementCards>
        ))}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box md:w-[800px] max-w-5xl">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label>
                  <div className="py-1">
                    <span className="font-bold font-inter"> Task Name</span>
                  </div>
                  <input
                    type="text"
                    defaultValue={tasksId.task_name}
                    {...register("taskName")}
                    required
                  />
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-3 pb-3">
                <label>
                  <div className="py-1">
                    <span className="font-bold font-inter"> Start Date</span>
                  </div>
                  <input
                    type="date"
                    defaultValue={tasksId.start_date}
                    {...register("startDate")}
                    placeholder="Please Add Event Name"
                    required
                  />
                </label>
                <label>
                  <div className="py-1">
                    <span className="font-bold font-inter"> End Date</span>
                  </div>
                  <input
                    type="date"
                    defaultValue={tasksId.end_date}
                    {...register("endDate")}
                    placeholder="Please Add Event Name"
                    required
                  />
                </label>
              </div>
              <div>
                <h1 className="text-xl font-semibold mb-4">
                  Assigned Employees
                </h1>
                <div className="flex flex-wrap gap-2">
                  {tasksId?.employees?.map((employee) => (
                    <div
                      key={employee._id}
                      className="flex justify-between items-center border-2 border-primary rounded-full w-[245px]"
                    >
                      <div className="flex items-center gap-2">
                        <div>
                          <img
                            className="h-10 w-10 border-r-2 border-primary rounded-full"
                            src={employee.image}
                            alt=""
                          />
                        </div>
                        <h1 className="text-lg font-semibold">
                          {" "}
                          {employee.name.length > 15 ? (
                            <span>{employee.name.slice(0, 15)}...</span>
                          ) : (
                            <span>{employee.name}</span>
                          )}{" "}
                        </h1>
                      </div>
                      <SelectUnselectButton
                        item={employee}
                        selectedEmployees={selectedEmployees}
                        setSelectedEmployees={setSelectedEmployees}
                      ></SelectUnselectButton>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-48 mt-10 md:mt-0 bg-primary border-none text-white rounded-xl text-center cursor-pointer">
                <input
                  className="border-none cursor-pointer py-3 font-semibold text-base"
                  type="submit"
                  value="Insert Task"
                />
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default TaskManagement;
