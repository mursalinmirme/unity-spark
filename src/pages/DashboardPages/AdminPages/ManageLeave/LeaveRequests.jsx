import PendingRequests from "./PendingRequests";
import AcceptedRequested from "./AcceptedRequested";
import RejectedRequestes from "./RejectedRequestes";
import { useState } from "react";

const LeaveRequests = () => {
    const [isActive, setIsActive] = useState(0);

    const handleJobAdsTab = (id) => {
      setIsActive(id);
    };
  
    const tabs = [
      {
        name: "Pending Leave Requests",
        id: 0,
      },
      {
        name: "Accepted Leave Requests",
        id: 1,
      },
      {
        name: "Rejected Leave Requests",
        id: 2,
      },
    ];
    return (
        <div>
      <div className="grid grid-cols-3 text-center md:text-lg bg-[#e3e2f5] rounded-lg p-2 md:p-3">
        {tabs?.map((tab) => (
          <a
            key={tab.id}
            className={`${
              isActive === tab.id
                ? "font-medium text-white bg-primary py-1 md:py-3 rounded-lg text-sm md:text-base"
                : "bg-transparent text-primary md:px-5 py-1 md:py-3 font-semibold cursor-pointer text-sm md:text-base"
            }`}
            onClick={() => handleJobAdsTab(tab.id)}
          >
            {tab.name}
          </a>
        ))}
      </div>
      {isActive === 0 && <PendingRequests></PendingRequests>}
      {isActive === 1 && <AcceptedRequested></AcceptedRequested>}
      {isActive === 2 && <RejectedRequestes></RejectedRequestes>}
        </div>
    );
};

export default LeaveRequests;