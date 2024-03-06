import ProgressBar from "@ramonak/react-progress-bar";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import moment from "moment";

const CompletedTaskCard = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  // get running task of the loged in employee
  const { data: myRecentCompleteTask = {}, isFetching } = useQuery({
    queryKey: ["myRecentCompleteTasks"],
    queryFn: async () => {
      const result = await axiosPublic.get(
        `/my-recent-complete-task/${user?.email}`
      );
      return result.data[0];
    },
  });
  const startDate = moment(myRecentCompleteTask?.start_date);
  const endDate = moment(myRecentCompleteTask?.end_date);
  const formattedStartDate = startDate.format("DD MMM");
  const formattedEndDate = endDate.format("DD MMM");

  console.log("checked completed tasks", myRecentCompleteTask);

  if (isFetching) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-3">Running Task</h1>
        <div className="border-2 border-gray-300 p-5">
          <div className="space-y-2">
            <div className="skeleton w-full h-4"></div>
            <div className="skeleton w-full h-4"></div>
            <div className="skeleton w-2/3 h-4"></div>
          </div>
          <div className="flex justify-between gap-5 items-center mt-3">
            <div className="skeleton w-1/2 h-6"></div>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="skeleton w-10 h-10 rounded-full"></div>
              <div className="skeleton w-10 h-10 rounded-full"></div>
              <div className="skeleton w-10 h-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Completed Task</h2>
      {myRecentCompleteTask?.task_name ? (
        <div
          onClick={() =>
            document.getElementById("completed_task_modal").showModal()
          }
          className="border-2 border-[#38B000] bg-[#EBF7E5] rounded-xl px-2 md:px-5 py-2 space-y-4"
        >
          <div className="flex items-center justify-between ">
            <div>
              <h2 className="text-lg font-bold">
                {myRecentCompleteTask?.task_name}
              </h2>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between items-center py-2">
            <div className="mt-3 md:mt-0">
              <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold">
                {formattedStartDate}
                <span className="text-2xl font-bold">-</span>{" "}
                {formattedEndDate}
              </span>
            </div>

            <div>
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                {myRecentCompleteTask?.employees?.length > 3
                  ? myRecentCompleteTask?.employees
                      .slice(0, 3)
                      .map((employee) => {
                        return (
                          <div key={employee?._id} className="avatar">
                            <div className="w-10">
                              <img src={employee?.image} />
                            </div>
                          </div>
                        );
                      })
                  : myRecentCompleteTask?.employees?.map((employee) => {
                      return (
                        <div key={employee?._id} className="avatar">
                          <div className="w-10">
                            <img src={employee?.image} />
                          </div>
                        </div>
                      );
                    })}
                {myRecentCompleteTask?.employees?.length > 3 && (
                  <div className="avatar placeholder">
                    <div className="w-10 bg-white text-primary font-semibold">
                      <span>
                        {myRecentCompleteTask?.employees?.length - 3}+
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-40 border border-accent bg-[#EBF7E5] rounded-xl flex justify-center items-center">
          <p className="text-lg font-semibold">
            {`You didn't completed any task yet!`}
          </p>
        </div>
      )}
      <dialog id={"completed_task_modal"} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-500">
              ✕
            </button>
          </form>
          <div>
            <h2 className="text-lg font-bold">
              {myRecentCompleteTask?.task_name}
            </h2>

            <div className="mt-4 flex justify-between items-center gap-1 md:gap-6">
              <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold flex">
                <span className="hidden md:block mr-1">From: </span>{" "}
                <span>{myRecentCompleteTask?.start_date}</span>
              </span>
              <span>
                <FaArrowRightLong className="text-base md:text-xl text-primary"></FaArrowRightLong>
              </span>
              <span className="border px-4 bg-gray-300 p-1 rounded-lg text-[#433EBE] font-bold flex">
                <span className="hidden md:block mr-1">To:</span>
                <span>{myRecentCompleteTask?.end_date}</span>
              </span>
            </div>
            <div className="mt-4">
              <h2 className="text-[18px] font-bold mb-2">Work Progress</h2>

              <ProgressBar
                completed={100}
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
              {myRecentCompleteTask?.employees?.map((employee) => (
                <div key={employee.id} className="form-control">
                  <label className="label cursor-pointer justify-start gap-4">
                    <input
                      type="checkbox"
                      // defaultChecked={
                      //   employee?.status === "complete" ? true : false
                      // }
                      checked
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text">{employee?.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-center font-bold text-green-600">Completed</h3>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CompletedTaskCard;
