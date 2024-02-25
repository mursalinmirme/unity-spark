import { useState } from "react";
import EmployeesPayment from "./EmployeesPayment";
import OtherPayment from "./OtherPayment";
import PaymentHistory from "./PaymentHistory";

const PaymentManagement = () => {
  const [isActive, setIsActive] = useState(0);

  const handleJobAdsTab = (id) => {
    setIsActive(id);
  };

  const tabs = [
    {
      name: "Employees Payment",
      id: 0,
    },
    {
      name: "Other Payment",
      id: 1,
    },
    {
      name: "Payment History",
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
      {isActive === 0 && <EmployeesPayment></EmployeesPayment>}
      {isActive === 1 && <OtherPayment></OtherPayment>}
      {isActive === 2 && <PaymentHistory></PaymentHistory>}
    </div>
  );
};

export default PaymentManagement;
