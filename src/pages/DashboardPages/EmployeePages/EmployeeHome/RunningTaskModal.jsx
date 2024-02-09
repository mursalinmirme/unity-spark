import ProgressBar from "@ramonak/react-progress-bar";

const RunningTaskModal = ({
  progress,
  dummyEmployees,
  handleRunningProgress,
}) => {
  return (
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
              dummyEmployees?.map((employee) => (
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
  );
};

export default RunningTaskModal;
