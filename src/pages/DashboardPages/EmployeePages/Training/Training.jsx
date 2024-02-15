import { useState } from "react";
import AvailableCourse from "../AvailableCourse/AvailableCourse";
import MyCourse from "../MyCourse/MyCourse";

const Training = () => {
    const [isActive, setIsActive] = useState(0);

  const handleJobAdsTab = (id) => {
    setIsActive(id);
  };
  const tabs = [
    {
      name: "Available Course",
      id: 0,
    },
    {
      name: "My Course",
      id: 1,
    },
  ];
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
            onClick={() => handleJobAdsTab(tab.id)}
          >
            {tab.name}
          </a>
        ))}
      </div>
      {isActive === 0 && <AvailableCourse/>}
      {isActive === 1 && <MyCourse></MyCourse>}
   
        </div>
    );
};

export default Training;