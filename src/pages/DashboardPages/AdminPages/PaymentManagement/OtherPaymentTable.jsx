import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const OtherPaymentTable = ({ utensil }) => {
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
    <tr className="row-border border-r-2 border-r-[#45A5E1]">
      <td>{utensil?.name}</td>

      <td>{utensil?.cost ? utensil?.cost : "$5000"}</td>
      <td>
        <button
          onClick={() =>
            handleNavigate(
              utensil?._id,
              utensil?.cost ? utensil?.cost : 5000,
              utensil?.name
            )
          }
          className="bg-[#433EBE] text-white px-4 rounded-2xl py-1"
        >
          Pay
        </button>
      </td>
    </tr>
  );
};

OtherPaymentTable.propTypes = {
  utensil: PropTypes.object,
};

export default OtherPaymentTable;
