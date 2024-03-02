/* eslint-disable no-unused-vars */

import { PiMicrophoneStageThin } from "react-icons/pi";

/* eslint-disable react/prop-types */
const RegisteredEvents = ({ EmployeeReqEvent, isFetching }) => {
  console.log("Paici re paici re amar events  paichi");

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
            <div className="flex justify-between gap-5 items-center mt-4">
              <div className="skeleton w-1/3 h-6"></div>
              <div className="skeleton w-1/3 h-6"></div>
            </div>
          </div>
          <div className="border-2 border-gray-300 p-5">
            <div className="space-y-2">
              <div className="skeleton w-full h-4"></div>
              <div className="skeleton w-2/3 h-4"></div>
            </div>
            <div className="flex justify-between gap-5 items-center mt-4">
              <div className="skeleton w-1/3 h-6"></div>
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
            className="border-2  bg-[#F7F7F7] rounded-xl px-2 md:px-5 pt-2 pb-4"
          >
            <div className="flex items-center justify-between ">
              <div>
                <h2 className="text-[18px] font-bold">
                  {information?.reqeventName}
                </h2>
              </div>
            </div>
            <div></div>
            <div className="flex justify-between mt-4">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredEvents;
