/* eslint-disable no-unused-vars */
import { PiMicrophoneStageThin } from "react-icons/pi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

/* eslint-disable react/prop-types */
const RegisteredEvents = ({ EmployeeReqEvent, isFetching, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reqEvents/${id}`).then((res) => {
          if (res?.data?.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  if (isFetching) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-3">Registered Events</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border-2 border-gray-300 p-5">
            <div className="space-y-2">
              <div className="skeleton w-full h-4"></div>
              <div className="skeleton w-2/3 h-4"></div>
            </div>
            <div className="md:flex justify-between gap-5 items-center mt-4 hidden">
              <div className="skeleton w-2/3 h-6"></div>
              <div className="skeleton w-1/3 h-6"></div>
              <div className="skeleton w-1/4 h-6"></div>
            </div>
            <div className="block md:hidden">
              <div className="flex gap-5 my-3">
                <div className="skeleton w-2/3 h-6"></div>
                <div className="skeleton w-1/3 h-6"></div>
              </div>
              <div className="skeleton w-1/3 h-6"></div>
            </div>
          </div>
          <div className="border-2 border-gray-300 p-5">
            <div className="space-y-2">
              <div className="skeleton w-full h-4"></div>
              <div className="skeleton w-2/3 h-4"></div>
            </div>
            <div className="md:flex justify-between gap-5 items-center mt-4 hidden">
              <div className="skeleton w-2/3 h-6"></div>
              <div className="skeleton w-1/3 h-6"></div>
              <div className="skeleton w-1/4 h-6"></div>
            </div>
            <div className="block md:hidden">
              <div className="flex gap-5 my-3">
                <div className="skeleton w-2/3 h-6"></div>
                <div className="skeleton w-1/3 h-6"></div>
              </div>
              <div className="skeleton w-1/3 h-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Registered Events</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1st Card */}
        {EmployeeReqEvent.map((information) => (
          <div
            key={information._id}
            className="border-2  bg-[#F7F7F7] rounded-xl p-3 md:px-5 pt-2 pb-4"
          >
            <h2 className="text-[18px] font-bold">
              {information?.reqeventName}
            </h2>
            <div className="md:flex gap-3 mt-4 items-center justify-between">
              <div className="flex flex-col md:flex-row md:items-center justify-center gap-5 md:gap-10 mb-5 md:mb-0">
                <div>
                  <span className="border px-4 bg-[#DFDFDF] p-1 rounded-lg font-bold">
                    {information?.reqeventDate}
                  </span>
                </div>
                <div>
                  <span className="border px-4 bg-[#DFDFDF] p-1 rounded-lg font-bold">
                    {information?.reqeventStartTime}
                  </span>
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleDelete(information?._id)}
                  className="border px-4 bg-red-500 text-white p-1 rounded-lg font-bold"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredEvents;
