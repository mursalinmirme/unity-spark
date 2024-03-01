import PropTypes from "prop-types";
import { IoEyeOutline } from "react-icons/io5";
import LeaveManagementSkeleton from "./LeaveManagementSkeleton";

const LeavesRow = ({ leave, idx }) => {

  return (
    <tr className="text-sm">
      <td className="!text-left">{idx + 1}</td>
      <td className="!text-left">
        <div>
          <div>
            <div>{leave?.subject}</div>
          </div>
        </div>
      </td>
      <td className="!text-left">
        {leave?.leaveReason.length > 35 ? (
          <span>{leave?.leaveReason.slice(0, 35)}...</span>
        ) : (
          leave?.leaveReason
        )}
      </td>
      <td className="!text-center">{leave?.numberOfDays}</td>
      <td className="font-bold !text-left ">
        {leave?.status === "Rejected" ? (
          <button
            onClick={() =>
              document.getElementById(`modal_${leave?._id}`).showModal()
            }
          >
            <div className="flex items-center font-medium gap-2 text-red-600 !text-left">
            {leave?.status}
              <div className=" w-6 h-6 mx-auto rounded-md flex items-center justify-center text-white bg-primary border">
                <IoEyeOutline className="text-base"></IoEyeOutline>
              </div>
            </div>
          </button>
        ) : (
          <span className="!text-left font-semibold text-green-600">{leave?.status}</span>
        )}
        {/* <h3>{leave?.feedback}</h3> */}
      </td>

      <dialog id={`modal_${leave?._id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="mt-5 text-xl font-inter">
            <h3 className="text-lg font-semibold border-b-2 pb-1">Leave Rejected Reason</h3>
            {leave?.feedback
              ? <p className="text-base  mt-5">{leave?.feedback}</p>
              : `Your application isn't granted due to unavoidable reason`}
          </div>
        </div>
      </dialog>
    </tr>
  );
};

LeavesRow.propTypes = {
  leave: PropTypes.object,
  idx: PropTypes.number,
};

export default LeavesRow;
