import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const OtherPaymentTable = ({ utensil }) => {
  return (
    <tr className="row-border border-r-2 border-r-[#45A5E1]">
      <td>{utensil?.name}</td>

      <td>{utensil?.cost ? utensil?.cost : "$5000"}</td>
      <td>
        <Link to={`/dashboard/payment-management/payment`}>
          <button className="bg-[#433EBE] text-white px-4 rounded-2xl py-1">
            Pay
          </button>
        </Link>
      </td>
    </tr>
  );
};

OtherPaymentTable.propTypes = {
  utensil: PropTypes.object,
};

export default OtherPaymentTable;
