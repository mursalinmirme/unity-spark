import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MdDone } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "sonner";
import "./tasks.css";
import "../../DashboardPages/EmployeePages/MyProfile/profile.css";

const AddNewTask = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees");
      return res.data;
    },
  });

  const {
    control,
    register,
    reset,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const SelectUnselectButton = ({
    item,
    selectedEmployees,
    setSelectedEmployees,
  }) => {
    const isSelected = selectedEmployees.some((emp) => emp._id === item._id);

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
            email: item.email,
            name: item.name,
            image: item.image,
            progress: "incomplete",
            position: item.position,
            status: "running",
          },
        ]);
      }
    };

    return (
      <div className="cursor-pointer" onClick={handleClick}>
        {isSelected ? (
          <MdDone className="add-task-icons" />
        ) : (
          <IoAdd className="add-task-icons" />
        )}
      </div>
    );
  };

  const onSubmit = (data) => {
    const taskData = {
      task_name: data?.taskName,
      start_date: data.startDate,
      end_date: data.endDate,
      employees: selectedEmployees,
    };
    axiosSecure.post("/add-task", taskData).then((res) => {
      console.log(res.data);
      toast.success("Task successfully added");
      reset();
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold"> Add a New Task </h1>
        <Link to="/dashboard/taskManagement">
          <a className="edit_btn !text-red-500 hover:!text-white !border-red-600 hover:!border-red-600 hover:!bg-red-600">
            <span> X Cancel </span>
          </a>
        </Link>
      </div>
      <div className="mt-7">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border-2 rounded-lg p-7 space-y-3">
            <div className="form-control">
              <label className="">
                <span className="user_profile_input_title ">Task Name</span>
              </label>
              <input
                type="text"
                className="user_profile_input mt-0"
                placeholder="Enter task name"
                {...register("taskName", { required: true })}
              />
              {errors.taskName && (
                <span className="error text-red-500">
                  Please fill up this field
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="">
                  <span className="user_profile_input_title mt-0">
                    Start Date
                  </span>
                </label>
                <input
                  type="date"
                  className="user_profile_input mt-0"
                  {...register("startDate", { required: true })}
                />
                {errors.startDate && (
                  <span className="error text-red-500">
                    Please fill up this field
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="">
                  <span className="user_profile_input_title">End Date</span>
                </label>
                <input
                  type="date"
                  className="user_profile_input mt-0"
                  {...register("endDate", { required: true })}
                />
                {errors.endDate && (
                  <span className="error text-red-500">
                    Please fill up this field
                  </span>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold font-inter mb-4">
                Assign Employees
              </h1>
              <div className="flex flex-wrap gap-4">
                {data?.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-2 border-primary rounded-full w-full md:w-[290px]"
                  >
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          className="h-10 w-10 border-r-2 border-primary rounded-full"
                          src={item.image}
                          alt=""
                        />
                      </div>
                      <h1 className="text-base font-semibold">
                        {" "}
                        {item.name.length > 20 ? (
                          <span>{item.name.slice(0, 20)}...</span>
                        ) : (
                          <span>{item.name}</span>
                        )}{" "}
                      </h1>
                    </div>
                    <SelectUnselectButton
                      item={item}
                      selectedEmployees={selectedEmployees}
                      setSelectedEmployees={setSelectedEmployees}
                    ></SelectUnselectButton>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className="nbtn-fixed-bg mt-3">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;
