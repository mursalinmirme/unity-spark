import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./payment.css";

const EmployeePaymentTable = ({ employee }) => {
  const navigate = useNavigate();
  const handleNavigate = (id, salary, email) => {
    const salaryInfo = {
      id,
      salary,
      email,
    };
    navigate("/dashboard/payment-management/payment", { state: salaryInfo });
  };
  return (
    <tr className="row-border !font-medium table-style ">
      <td>{employee?.name}</td>
      <td>{employee?.position}</td>
      <td>${employee?.salary ? employee?.salary : "0"}</td>
      <td>
        <button
          onClick={() =>
            handleNavigate(
              employee?._id,
              employee?.salary ? employee?.salary : 0,
              employee?.email
            )
          }
          className="bg-[#433EBE] text-white px-4 rounded-2xl py-1"
        >
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
