import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const EmployeePaymentTable = ({ employee }) => {
  const navigate = useNavigate();
  const handleNavigate = (id, salary) => {
    const salaryInfo = {
      id,
      salary,
    };
    navigate("/dashboard/payment-management/payment", { state: salaryInfo });
  };
  return (
    <tr className="row-border border-r-2 border-r-[#45A5E1]">
      <td>{employee?.name}</td>
      <td>{employee?.position}</td>
      <td>{employee?.salary ? employee?.salary : "$5000"}</td>
      <td>
        <button
          onClick={() =>
            handleNavigate(
              employee?._id,
              employee?.salary ? employee?.salary : 5000
            )
          }
          className="bg-[#433EBE] text-white px-4 rounded-2xl py-1">
          Pay
        </button>
        {/* /dashboard/payment-management/payment */}
      </td>
    </tr>
  );
};

EmployeePaymentTable.propTypes = {
  employee: PropTypes.object,
};

export default EmployeePaymentTable;
