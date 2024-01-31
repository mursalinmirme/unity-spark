import { useState } from "react";
import ManageAds from "../../../components/Dashboard/JobAds/ManageAds";
import ManageApplications from "../../../components/Dashboard/JobAds/ManageApplications";
import ManageApplicant from "../../../components/Dashboard/JobAds/ManageApplicant";

const JobAds = () => {
  const [isActive, setIsActive] = useState(0);

  const handleJobAdsTab = (id) => {
    setIsActive(id);
  };

  const tabs = [
    {
      name: "Manage Job Ads",
      id: 0,
    },
    {
      name: "Manage Applications",
      id: 1,
    },
    {
      name: "Manage Applicant",
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
                ? "font-medium text-white bg-primary py-1 md:py-3 rounded-lg"
                : "bg-transparent text-primary md:px-5 py-1 md:py-3 font-semibold cursor-pointer"
            }`}
            onClick={() => handleJobAdsTab(tab.id)}
          >
            {tab.name}
          </a>
        ))}
      </div>
      {isActive === 0 && <ManageAds />}
      {isActive === 1 && <ManageApplications />}
      {isActive === 2 && <ManageApplicant />}
    </div>
  );
};

export default JobAds;
