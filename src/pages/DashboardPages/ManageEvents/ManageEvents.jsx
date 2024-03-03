import { useState } from "react";
import AddEvent from "../AdminPages/AddEvent/AddEvent";
import ModifyEvent from "../AdminPages/ModifyEvent/ModifyEvent";

const ManageEvents = () => {
    const [isActive, setIsActive] = useState(0);
    const handleEventsTab = (id) => {
        setIsActive(id);
      };
      const tabs = [
        {
          name: "Events",
          id: 0,
        },
        {
          name: "New Event",
          id: 1,
        },
      ]
    return (
        <div>
        <div className="grid grid-cols-2 text-center md:text-lg bg-[#e3e2f5] rounded-lg p-2 md:p-3">
          {tabs?.map((tab) => (
            <a
              key={tab.id}
              className={`${
                isActive === tab.id
                  ? "font-medium text-white bg-primary py-1 md:py-3 rounded-lg"
                  : "bg-transparent text-primary md:px-5 py-1 md:py-3 font-semibold cursor-pointer"
              }`}
              onClick={() => handleEventsTab(tab.id)}
            >
              {tab.name}
            </a>
          ))}
        </div>
        {isActive === 0 && <ModifyEvent />}
        {isActive === 1 && <AddEvent/>}
        
      </div>
    );
};

export default ManageEvents;
