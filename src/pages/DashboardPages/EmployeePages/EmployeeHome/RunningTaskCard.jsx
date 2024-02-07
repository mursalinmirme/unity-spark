import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from "react";

const RunningTaskCard = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const dummyEmployees = [
    {
      id: 1,
      name: "John",
    },
    {
      id: 2,
      name: "Emma",
    },
    {
      id: 3,
      name: "Michael",
    },
    {
      id: 4,
      name: "Sophia",
    },
    {
      id: 5,
      name: "David",
    },
  ];

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

  const progress = selectedEmployees.length * (100 / dummyEmployees.length);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Running Task</h2>
      <div
        className="border-2 border-[#433EBE] bg-[#ECECF8] rounded-xl px-2 md:px-5 py-2 space-y-4 hover:cursor-pointer"
        onClick={() => document.getElementById("modal_running").showModal()}>
        <div className="flex items-center justify-between ">
          <div>
            <h2 className="text-[18px] font-bold">
              Write Code for New Feature or Application
            </h2>
          </div>
        </div>
        <div className="flex justify-between items-center py-2">
          <div>
            <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold">
              {" "}
              6 feb - 21 feb
            </span>
          </div>

          <div>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-12">
                  <img src="https://i.ibb.co/DRqXm4r/395687920-750115476879631-8529659874036745582-n.jpg" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://i.ibb.co/ZhFn0Ph/profile-pic-6.png" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://i.ibb.co/tLN9ddt/prflPic.jpg" />
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="w-12 bg-white text-primary font-semibold text-xl">
                  <span>+3</span>
                </div>
              </div>
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
            <h2 className="text-[18px] font-bold">
              Write Code for New Feature or Application
            </h2>

            <div className="mt-4">
              <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold">
                {" "}
                6 feb - 21 feb
              </span>
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
              {dummyEmployees &&
                dummyEmployees.map((employee) => (
                  <div key={employee.id} className="form-control">
                    <label className="label cursor-pointer justify-start gap-4">
                      <input
                        type="checkbox"
                        onClick={() => handleRunningProgress(employee.id)}
                        className="checkbox checkbox-primary"
                      />
                      <span className="label-text">{employee.name}</span>
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
