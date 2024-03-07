import { useState } from "react";
import AvailableCourse from "../AvailableCourse/AvailableCourse";
import MyCourse from "../MyCourse/MyCourse";
import CompletedCourses from "../CompletedCourses/CompletedCourses";

const Training = () => {
  const [isActive, setIsActive] = useState(0);

  const handleJobAdsTab = (id) => {
    setIsActive(id);
  };
  const tabs = [
    {
      name: "Available Courses",
      id: 0,
    },
    {
      name: "My Courses",
      id: 1,
    },
    {
      name: "Completed Courses",
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
                ? "ffont-medium text-white bg-primary py-1 md:py-3 rounded-lg"
                : "bg-transparent text-primary md:px-5 py-1 md:py-3 font-semibold cursor-pointer"
            }`}
            onClick={() => handleJobAdsTab(tab.id)}
          >
            {tab.name}
          </a>
        ))}
      </div>
      {isActive === 0 && <AvailableCourse />}
      {isActive === 1 && <MyCourse></MyCourse>}
      {isActive === 2 && <CompletedCourses></CompletedCourses>}
    </div>
  );
};

export default Training;
