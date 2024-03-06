import ProgressBar from "@ramonak/react-progress-bar";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TaskManagementCards from "./TaskManagementCards";
const TaskManagement = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [currentId, setcurrentId] = useState(null);
  const [modalShowId, setModalShowId] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState();
  const [completetedEmployees, setCompleteEmployees] = useState([]);
  const {
    data: tasks = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tasks");
      // console.log(res?.data?.employees);
      // const checkedTasker = res?.data.employees
      //   .filter((item) => item.status === "complete")
      //   .map((task) => task._id);
      // console.log("the cheked usersa are", checkedTasker);
      return res?.data;
    },
  });
  const { data: tasksId = [], refetch: taskIdRefetch } = useQuery({
    queryKey: ["tasksId", currentId],
    enabled: !!currentId,
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks/${currentId}`);
      setSelectedEmployees(res?.data?.employees);
      const completedEmployeeIds = res.data.employees
        .filter((empInfo) => empInfo?.status === "complete")
        .map((empInfo) => empInfo._id);
      setCompleteEmployees(completedEmployeeIds);
      return res.data;
    },
  });

  const progressTotal =
    completetedEmployees?.length * (100 / tasksId?.employees?.length);
  const progress = parseInt(progressTotal.toFixed());
  const handleTaskComplete = (taskId) => {
       axiosSecure.put(`/complete-task/${taskId}`)
       .then(() => {
        toast.success("Task Completed successfully");
        taskIdRefetch();
       })
       .catch((err) => {
        toast.error(err?.message);
       })
  };


  const startDate = moment(tasksId?.start_date);
  const endDate = moment(tasksId?.end_date);
  const formattedStartDate = startDate.format("DD MMM");
  const formattedEndDate = endDate.format("DD MMM");

  const { data, refetch: dataRefetch } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees");

      return res.data;
    },
  });

  const similarEmployeeIds = selectedEmployees?.map((employee) => employee._id);

  const remainingEmployees = data?.filter(
    (employee) => !similarEmployeeIds?.includes(employee._id)
  );

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const updatedTask = {
      task_name: data.taskName || tasksId?.task_name,
      starts_date: data.startDate || tasksId?.start_date,
      end_date: data.endDate || tasksId?.end_date,
      employees: selectedEmployees,
    };
    console.log(updatedTask);
    axiosPublic.put(`/tasks/${currentId}`, updatedTask).then((res) => {
      if (res?.data?.modifiedCount > 0) {
        toast.success("Task Updated");
        reset();
        refetch();
        // taskIdRefetch();
        dataRefetch();
      }
    });
  };

  const hanleModalShow = (id) => {
    setcurrentId(id);
    taskIdRefetch();
    document.getElementById("my_modal_4").showModal();
  };

  const handleRunningProgress = (id, status) => {
    console.log(id, status);
    // const index = selectedEmployees.indexOf(id);
    // if (index === -1) {
    //   setSelectedEmployees([...selectedEmployees, id]);
    // } else {
    //   const updatedSelectedEmployees = [...selectedEmployees];
    //   updatedSelectedEmployees.splice(index, 1);
    //   setSelectedEmployees(updatedSelectedEmployees);
    // }

    // axiosPublic
    //   .put(`/tasks/${id}`, {
    //     currentTaskId: myRunningTasks?._id,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     refetch();
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
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
    taskIdRefetch();
    setcurrentId(id);
    document.getElementById("my_modal_3").showModal();
  };

  const SelectUnselectButton = ({ item }) => {
    const isSelected = selectedEmployees?.some(
      (employee) => employee._id === item._id
    );
    const handleClick = () => {
      if (isSelected) {
        const updatedEmployees = selectedEmployees.filter(
          (employee) => employee._id !== item._id
        );
        setSelectedEmployees(updatedEmployees);
      } else {
        if (selectedEmployees.length < data?.length) {
          const updatedEmployees = [
            ...selectedEmployees,
            {
              _id: item._id,
              name: item.name,
              email: item.email,
              image: item.image,
              position: item.position,
              progress: item.progress || "incomplete",
              status: item.status || "running",
            },
          ];
          setSelectedEmployees(updatedEmployees);
        } else {
          console.error("You can select only four employees.");
        }
      }
    };


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
  if (isFetching) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-7">Tasks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border-2 border-gray-300 p-5">
              <div className="space-y-2">
                <div className="skeleton w-full h-4"></div>
                <div className="skeleton w-2/3 h-4"></div>
              </div>
              <div className="flex justify-between gap-5 items-center mt-5">
                <div className="skeleton w-1/2 h-6"></div>
                <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                  <div className="skeleton w-12 h-12 rounded-full"></div>
                  <div className="skeleton w-12 h-12 rounded-full"></div>
                  <div className="skeleton w-12 h-12 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold"> Tasks </h1>
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
            hanleModalShow={hanleModalShow}
          ></TaskManagementCards>
        ))}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box lg:w-[750px] max-w-5xl">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label>
                  <div>
                    <span className="task_input_title"> Task Name</span>
                  </div>
                  <input
                    type="text"
                    defaultValue={tasksId?.task_name}
                    {...register("taskName")}
                    className="task_input"
                    required
                  />
                </label>
              </div>
              <div className="grid md:grid-cols-2 gap-3 pb-3">
                <label>
                  <div>
                    <span className="task_input_title"> Start Date</span>
                  </div>
                  <input
                    type="date"
                    defaultValue={tasksId?.start_date}
                    {...register("startDate")}
                    placeholder="Please Add Event Name"
                    className="task_input"
                    required
                  />
                </label>
                <label>
                  <div>
                    <span className="task_input_title"> End Date</span>
                  </div>
                  <input
                    type="date"
                    defaultValue={tasksId.end_date}
                    {...register("endDate")}
                    placeholder="Please Add Event Name"
                    className="task_input"
                    required
                  />
                </label>
              </div>
              <div>
                <h1 className="task_input_title mb-4">Assigned Employees</h1>
                <div className="flex flex-wrap gap-2">
                  {tasksId?.employees?.map((employee) => (
                    <div
                      key={employee._id}
                      className="flex justify-between items-center border-2 border-primary rounded-full w-full md:w-[225px]"
                    >
                      <div className="flex items-center gap-1.5">
                        <div>
                          <img
                            className="h-10 w-10 border-r-2 border-primary rounded-full"
                            src={employee.image}
                            alt=""
                          />
                        </div>
                        <h1 className="text-md font-semibold">
                          {" "}
                          {employee.name.length > 20 ? (
                            <span>{employee.name.slice(0, 20)}...</span>
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
              <div>
                <h1 className="task_input_title my-4">Assign New Employees</h1>
                <div className="flex flex-wrap gap-2">
                  {remainingEmployees?.map((employee) => (
                    <div
                      key={employee._id}
                      className="flex justify-between items-center border-2 border-primary rounded-full w-full md:w-[225px]"
                    >
                      <div className="flex items-center gap-1.5">
                        <div>
                          <img
                            className="h-10 w-10 border-r-2 border-primary rounded-full"
                            src={employee.image}
                            alt=""
                          />
                        </div>
                        <h1 className="text-md font-semibold">
                          {" "}
                          {employee.name.length > 20 ? (
                            <span>{employee.name.slice(0, 20)}...</span>
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
              <div>
                <input
                  className="nbtn-fixed-bg"
                  type="submit"
                  value="Insert Task"
                />
              </div>
            </form>
          </div>
        </dialog>

        <dialog id={"my_modal_4"} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-500">
                ✕
              </button>
            </form>
            <div>
              <h2 className="text-lg font-bold">{tasksId?.task_name}</h2>
              <div className="mt-4 md:flex justify-between items-center gap-2 md:gap-6 space-y-2 md:space-y-0">
                <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold flex">
                  <span className="">From: {formattedStartDate}</span>{" "}
                </span>
                <span>
                  {/* <FaArrowRightLong className="text-base md:text-xl text-primary"></FaArrowRightLong> */}
                </span>
                <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold flex">
                  <span className="">To: {formattedEndDate}</span>
                </span>
              </div>
              <div className="mt-4">
                <h2 className="text-[18px] font-bold mb-2">Work Progress</h2>

                <ProgressBar
                  completed={progress}
                  bgColor="#433ebe"
                  height="14px"
                  baseBgColor="#e3e2f5"
                  labelColor="#ffffff"
                  labelSize="12px"
                  maxCompleted={100}
                  animateOnRender
                />
              </div>

              <div className="my-4">
                {tasksId?.employees?.map((employee) => (
                  <div key={employee.id} className="form-control">
                    <label className="label cursor-pointer justify-start gap-4">
                      <input
                        type="checkbox"
                        checked={employee?.status === "complete" ? true : false}
                        onClick={() =>
                          handleRunningProgress(employee._id, employee?.status)
                        }
                        className="checkbox checkbox-primary"
                      />
                      <span className="label-text">{employee?.name}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div>
                {
                  tasksId?.status === 'running' ? <button
                  onClick={() => handleTaskComplete(tasksId?._id)}
                  disabled={progress === 100 ? false : true}
                  className={` ${progress < 100 ? "btn" : "nbtn"}`}
                >
                  Complete
                </button> : 
                <div className="badge badge-ghost h-10 text-primary font-semibold px-4 text-base">completed</div>
                }
                
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default TaskManagement;
