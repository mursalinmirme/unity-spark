import PropTypes from "prop-types";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { GoCheckCircleFill } from "react-icons/go";

const LeavesRow = ({ leave, idx }) => {
  return (
    <tr className="text-base border-b">
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
          <div className="tooltip" data-tip="See reason">
            <button
              onClick={() =>
                document.getElementById(`modal_${leave?._id}`).showModal()
              }
            >
              <div className="inline-flex items-center font-inter font-medium gap-1 text-red-600 bg-red-100 rounded-lg py-1 px-2 !text-left">
                <MdCancel className="text-lg" />
                {leave?.status}
              </div>
            </button>
          </div>
        ) : leave?.status === "Pending" ? (
          <div className="inline-flex items-center font-inter font-medium gap-1 text-second bg-[#e3f1fb] rounded-lg py-1 px-2 !text-left">
            <RiErrorWarningFill className="text-md" />
            {leave?.status}
          </div>
        ) : (
          <div className="inline-flex items-center font-inter font-medium gap-1 text-green-600 bg-green-100 rounded-lg py-1 px-2 !text-left">
            <GoCheckCircleFill className="text-md" />
            {leave?.status}
          </div>
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
            <h3 className="text-lg font-semibold border-b-2 pb-1">
              Leave Rejected Reason
            </h3>
            {leave?.feedback ? (
              <p className="text-base  mt-5">{leave?.feedback}</p>
            ) : (
              `Your application isn't granted due to unavoidable reason`
            )}
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
