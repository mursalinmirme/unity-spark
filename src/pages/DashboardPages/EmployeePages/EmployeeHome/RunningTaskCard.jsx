import ProgressBar from "@ramonak/react-progress-bar";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { FaArrowRightLong } from "react-icons/fa6";
import moment from "moment";
const RunningTaskCard = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  console.log(user?.email);

  // get running task of the loged in employee
  const {
    data: myRunningTasks = {},
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["myRunningTasks"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/my-running-task/${user?.email}`);
      const checkedTasker = result.data.employees
        .filter((item) => item.status === "complete")
        .map((task) => task._id);
      console.log("the cheked usersa are", checkedTasker);
      setSelectedEmployees(checkedTasker);
      return result.data;
    },
  });

  const startDate = moment(myRunningTasks?.start_date);
  const endDate = moment(myRunningTasks?.end_date);
  const formattedStartDate = startDate.format("DD MMM");
  const formattedEndDate = endDate.format("DD MMM");

  const handleTaskOpenModal = (e) => {
    document.getElementById("modal_running").showModal();
  };

  const handleRunningProgress = (employeeId) => {
    const index = selectedEmployees.indexOf(employeeId);
    if (index === -1) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      const updatedSelectedEmployees = [...selectedEmployees];
      updatedSelectedEmployees.splice(index, 1);
      setSelectedEmployees(updatedSelectedEmployees);
    }

    axiosPublic
      .put(`/my-running-task-progress/${employeeId}`, {
        currentTaskId: myRunningTasks?._id,
      })
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const progressTotal =
    selectedEmployees.length * (100 / myRunningTasks?.employees?.length);
  const progress = parseInt(progressTotal.toFixed());

  if (isFetching) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-3">Running Task</h1>
        <div className="border-2 border-gray-300 p-4">
          <div className="space-y-2">
            <div className="skeleton w-full h-4"></div>
            <div className="skeleton w-full h-4"></div>
            <div className="skeleton w-2/3 h-4"></div>
          </div>
          <div className="flex justify-between gap-5 items-center mt-3">
            <div className="skeleton w-1/2 h-6"></div>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="skeleton w-12 h-12 rounded-full"></div>
              <div className="skeleton w-12 h-12 rounded-full"></div>
              <div className="skeleton w-12 h-12 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Running Task</h2>
      {myRunningTasks.task_name ? (
        <div
          className="border-2 border-[#433EBE] bg-[#ECECF8] rounded-xl px-2 md:px-5 py-2 space-y-4 hover:cursor-pointer"
          onClick={() => handleTaskOpenModal(myRunningTasks?._id)}
        >
          <div className="flex items-center justify-between ">
            <div>
              <h2 className="text-lg font-bold">{myRunningTasks?.task_name}</h2>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between items-center py-2">
            <div className="mt-3 md:mt-0">
              <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold">
                {formattedStartDate}{" "}
                <span className="text-2xl font-bold">-</span> {formattedEndDate}
              </span>
            </div>

            <div>
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                {myRunningTasks?.employees?.length > 3
                  ? myRunningTasks?.employees.slice(0, 3).map((employee) => {
                      return (
                        <div key={employee?._id}>
                          <img
                            className="h-[45px] w-[45px] rounded-full"
                            src={employee?.image}
                          />
                        </div>
                      );
                    })
                  : myRunningTasks?.employees?.map((employee) => {
                      return (
                        <div key={employee?._id} className="">
                          <img
                            className="h-[45px] w-[45px] rounded-full"
                            src={employee?.image}
                          />
                        </div>
                      );
                    })}
                {myRunningTasks?.employees?.length > 3 && (
                  <div className="avatar placeholder">
                    <div className="w-10 bg-white text-primary font-semibold">
                      <span>{myRunningTasks?.employees?.length - 3}+</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-40 border border-accent bg-[#ECECF8] rounded-xl flex justify-center items-center">
          <p className="text-lg font-semibold">
            There has no running task assign with you
          </p>
        </div>
      )}

      <dialog id={"modal_running"} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <h2 className="text-lg font-bold">{myRunningTasks?.task_name}</h2>
            <div className="mt-3">
              <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold">
                {formattedStartDate}{" "}
                <span className="text-2xl font-bold">-</span> {formattedEndDate}
              </span>
            </div>
            <div className="mt-4">
              <h2 className="text-[18px] font-bold mb-2">Work Progress</h2>

              <ProgressBar
                completed={progress}
                bgColor="#433ebe"
                height="14px"
                baseBgColor="#e3e2f5"
                label={`${progress}%`}
                labelColor="#ffffff"
                labelSize="12px"
                maxCompleted={100}
                animateOnRender
              />
            </div>

            <div className="mt-4">
              {myRunningTasks?.employees?.map((employee) => (
                <div key={employee.id} className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={
                        employee?.status === "complete" ? true : false
                      }
                      onClick={() => handleRunningProgress(employee._id)}
                      className="checkbox checkbox-sm checkbox-primary"
                    />
                    <span className="label-text font-bold">
                      {employee?.name}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </dialog>

      {/* <RunningTaskModal
        progress={progress}
        dummyEmployees={dummyEmployees}
        handleRunningProgress={handleRunningProgress}></RunningTaskModal> */}
    </div>
  );
};

export default RunningTaskCard;
