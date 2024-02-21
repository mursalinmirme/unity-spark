import PropTypes from "prop-types";
import { IoEyeOutline } from "react-icons/io5";

const LeavesRow = ({ leave, idx }) => {
  console.log(leave);
  return (
    <tr>
      <td className="!text-left">{idx + 1}</td>
      <td className="!text-left">
        <div>
          <div>
            <div>{leave?.subject}</div>
          </div>
        </div>
      </td>
      <td className="!text-left">
        {leave?.leaveReason.length > 50 ? (
          <span>{leave?.leaveReason.slice(0, 50)}...</span>
        ) : (
          leave?.leaveReason
        )}
      </td>
      <td className="!text-left">{leave?.numberOfDays}</td>
      <td className="font-bold !text-left ">
        {leave?.status === "Rejected" ? (
          <button
            onClick={() =>
              document.getElementById(`modal_${leave?._id}`).showModal()
            }
          >
            <div className="flex items-center gap-2 !text-left">
              <div className="bg-primary w-8 h-7 mx-auto rounded-md flex items-center justify-center text-white">
                <IoEyeOutline className="text-md"></IoEyeOutline>
              </div>
              {leave?.status}
            </div>
          </button>
        ) : (
          <span className="!text-left">{leave?.status}</span>
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
            {leave?.feedback
              ? leave?.feedback
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
