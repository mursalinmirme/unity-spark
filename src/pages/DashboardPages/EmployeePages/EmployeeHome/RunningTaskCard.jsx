import ProgressBar from "@ramonak/react-progress-bar";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../Provider/AuthProvider";
const RunningTaskCard = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  console.log(user?.email);


  const handleRunningProgress = (employeeId) => {
    const index = selectedEmployees.indexOf(employeeId);
    if (index === -1) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      const updatedSelectedEmployees = [...selectedEmployees];
      updatedSelectedEmployees.splice(index, 1);
      setSelectedEmployees(updatedSelectedEmployees);
    }
  };

  // get running task of the loged in employee
  const {data:myRunningTasks={}} = useQuery({
    queryKey: ["myRunningTasks"],
    queryFn: async ()=> {
      const result = await axiosPublic.get(`/my-running-task/${user?.email}`);
      return result.data;
    }
  })

  console.log("My running task is", myRunningTasks);

  const handleTaskOpenModal = (e) => {
    document.getElementById("modal_running").showModal();

    
  }



  const progressTotal = selectedEmployees.length * (100 / myRunningTasks?.employees?.length);

  const progress = progressTotal.toFixed();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Running Task</h2>
          <div
          className="border-2 border-[#433EBE] bg-[#ECECF8] rounded-xl px-2 md:px-5 py-2 space-y-4 hover:cursor-pointer"
          onClick={() => handleTaskOpenModal(myRunningTasks?._id)}>
          <div className="flex items-center justify-between ">
            <div>
              <h2 className="text-lg font-bold">
                {myRunningTasks?.task_name}
              </h2>
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <div>
              <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold">
               {myRunningTasks?.start_date} --- {myRunningTasks?.end_date}
              </span>
            </div>
  
            <div>
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                {
                  myRunningTasks?.employees?.length > 5 ? 

                    myRunningTasks?.employees.slice(0, 5).map(employee => {
                      return <div key={employee?._id} className="avatar">
                      <div className="w-12">
                        <img src={employee?.image} />
                      </div>
                    </div> 
                    }): 
                      myRunningTasks?.employees?.map(employee => {
                        return <div key={employee?._id} className="avatar">
                        <div className="w-12">
                          <img src={employee?.image} />
                        </div>
                      </div>
                      })
                }
                {
                  myRunningTasks?.employees?.length > 5 && 
                  <div className="avatar placeholder">
                  <div className="w-12 bg-white text-primary font-semibold text-xl">
                    <span>+{myRunningTasks?.employees?.length - 5}</span>
                  </div>
                </div>
                }
              </div>
            </div>
          </div>
        </div>

      <dialog id={"modal_running"} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-500">
              ✕
            </button>
          </form>
          <div>
            <h2 className="text-lg font-bold">
              {myRunningTasks?.task_name}
            </h2>

            <div className="mt-4 flex gap-6">
              <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold">From: {myRunningTasks?.start_date}</span>
              <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold">To: {myRunningTasks?.end_date}</span>
            </div>
            <div className="mt-4">
              <h2 className="text-[18px] font-bold mb-2">Work Progress</h2>

              <ProgressBar
                completed={progress}
                bgColor="#433ebe"
                height="12px"
                baseBgColor="#e3e2f5"
                labelColor="#ffffff"
                labelSize="10px"
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
