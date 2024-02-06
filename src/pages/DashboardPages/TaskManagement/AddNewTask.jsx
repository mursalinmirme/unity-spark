import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { space } from "postcss/lib/list";
import { useState } from "react";
import toast from "react-hot-toast";

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
  console.log(data);

  const {
    control,
    register,
    reset,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const toggleEmployeeSelection = (employee) => {
    if (selectedEmployees.find((emp) => emp._id === employee._id)) {
      const employeeData = selectedEmployees.filter(
        (emp) => emp._id !== employee._id
      );
      setSelectedEmployees({
        _id: employeeData._id,
        name: employeeData.name,
        image: employeeData.image,
        position: employeeData.position,
      });
    } else {
      setSelectedEmployees([
        ...selectedEmployees,
        {
          _id: employee._id,
          name: employee.name,
          image: employee.image,
          position: employee.position,
        },
      ]);
    }
  };

  const onSubmit = (data) => {
    const taskData = {
      task_name: data?.taskName,
      start_date: data.startDate,
      endDate: data.endDate,
      employees : selectedEmployees
    };
    axiosSecure.post('/add-task', taskData)
    .then(res=>{
      console.log(res.data);
      toast.success('Task successfully added')
      reset();
    })
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl"> Add a New Task </h1>
        <Link
          to="/dashboard/taskManagement"
          className="edit_btn !text-red-500 hover:!text-white !border-red-600 hover:!border-red-600 hover:!bg-red-600"
        >
          <span> X Cancel </span>
        </Link>
      </div>
      <div className="mt-7">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border-2 rounded-lg p-7 space-y-3">
            <div className="form-control">
              <label className="">
                <span className="font-inter text-[18px] font-semibold">
                  Task Name
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered"
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
                  <span className="font-inter text-[18px] font-semibold">
                    Start Date
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="4/2/2024"
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
                  <span className="font-inter text-[18px] font-semibold">
                    End Date
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="6/2/2024"
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
              <h1 className="text-xl font-semibold mb-4">Assign Employees</h1>
              <div className="flex flex-wrap gap-4">
                {data?.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-2 border-primary rounded-full w-[320px]"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <img
                          className="h-12 w-12 border-r-2 border-primary rounded-full"
                          src={item.image}
                          alt=""
                        />
                      </div>
                      <h1 className="text-xl font-semibold">
                        {" "}
                        {item.name.length > 15 ? (
                          <span>{item.name.slice(0, 15)}...</span>
                        ) : (
                          <span>{item.name}</span>
                        )}{" "}
                      </h1>
                    </div>
                    <div
                      onClick={() => toggleEmployeeSelection(item)}
                      className="cursor-pointer"
                    >
                      <FaPlus className="bg-primary text-white text-4xl mr-2 p-2 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#433ebe] mt-5 px-10 text-white font-semibold rounded-md py-2"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;
