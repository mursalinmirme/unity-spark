import ProgressBar from "@ramonak/react-progress-bar";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { FaArrowRightLong } from "react-icons/fa6";
const RunningTaskCard = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  console.log(user?.email);

  // get running task of the loged in employee
  const { data: myRunningTasks = {}, refetch } = useQuery({
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

  const progress = progressTotal.toFixed();

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
                {myRunningTasks?.start_date}{" "}
                <span className="text-2xl font-bold">-</span>{" "}
                {myRunningTasks?.end_date}
              </span>
            </div>

            <div>
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                {myRunningTasks?.employees?.length > 5
                  ? myRunningTasks?.employees.slice(0, 5).map((employee) => {
                      return (
                        <div key={employee?._id} className="avatar">
                          <div className="w-12">
                            <img src={employee?.image} />
                          </div>
                        </div>
                      );
                    })
                  : myRunningTasks?.employees?.map((employee) => {
                      return (
                        <div key={employee?._id} className="avatar">
                          <div className="w-12">
                            <img src={employee?.image} />
                          </div>
                        </div>
                      );
                    })}
                {myRunningTasks?.employees?.length > 5 && (
                  <div className="avatar placeholder">
                    <div className="w-12 bg-white text-primary font-semibold text-xl">
                      <span>+{myRunningTasks?.employees?.length - 5}</span>
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
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-500">
              ✕
            </button>
          </form>
          <div>
            <h2 className="text-lg font-bold">{myRunningTasks?.task_name}</h2>

            <div className="mt-4 flex justify-between items-center gap-2 md:gap-6">
              <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold flex">
                <span className="hidden md:block">From:</span> <span>{myRunningTasks?.start_date}</span>
              </span>
              <span>
                <FaArrowRightLong className="text-base md:text-xl text-primary"></FaArrowRightLong>
              </span>
              <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold flex">
                <span className="hidden md:block">To: </span><span>{myRunningTasks?.end_date}</span>
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

            <div className="mt-4">
              {myRunningTasks?.employees?.map((employee) => (
                <div key={employee.id} className="form-control">
                  <label className="label cursor-pointer justify-start gap-4">
                    <input
                      type="checkbox"
                      defaultChecked={
                        employee?.status === "complete" ? true : false
                      }
                      onClick={() => handleRunningProgress(employee._id)}
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text">{employee?.name}</span>
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
