import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const PendingRequests = () => {
  const [rejectedId, setRejectedId] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { data: leaveRequests = [], refetch } = useQuery({
    queryKey: ["GetAllLeaveRequests"],
    queryFn: async () => {
      const result = await axiosPublic.get("/leaves");
      return result.data;
    },
  });
  console.log("Total leave requests", leaveRequests);
  //   handle accept leave
  const handleAcceptRequest = (acceptId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to give leave",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirmed",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/leaves-confirm/${acceptId}`, { status: "Confirmed" })
          .then((res) => {
            Swal.fire({
              title: "Confirmed",
              text: "Leave confirmation successfully",
              icon: "success",
            });
            refetch();
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };
  console.log("Rejected Id", rejectedId);
  // handle open modal
  const handleOpenModal = (rejectId) => {
    document.getElementById("my_modal_3").showModal();
    setRejectedId(rejectId);
  };

  // handle rejected feedback
  const handleRejectedFeedback = (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setErrorMsg('');
    const form = e.target;
    const feedback = form.feedback.value;
    if (feedback === "") {
      setErrorMsg("Please write a valuable feedback");
      setSubmitLoading(false);
      return;
    }

    axiosPublic
      .put(`/leaves-confirm/${rejectedId}`, {
        status: "Rejected",
        feedback: feedback,
      })
      .then(() => {
        refetch();
        setSubmitLoading(false);
        document.getElementById("my_modal_3").close();
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "Leave Rejected Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-5">
      {leaveRequests?.map((request) => {
        return (
          <div className="border shadow-sm p-3.5 rounded-md" key={request?._id}>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex">
                <img
                  className="w-14 h-14 rounded-full"
                  src={request?.user?.image}
                  alt=""
                />
                <div className="ml-2">
                  <p className="font-semibold text-lg">{request?.user?.name}</p>
                  <p className="font-semibold text-base">
                    {request?.user?.position}
                  </p>
                </div>
              </div>
              <h3 className="font-bold text-lg mr-4">
                {request?.numberOfDays} Days
              </h3>
            </div>
            <div className="mt-3">
              <p className="text-lg font-medium">Subject: {request?.subject}</p>
              <p className="font-normal text-base mt-1">
                {request?.leaveReason}
              </p>
            </div>
            <div className="mt-3 flex gap-5">
              <button
                onClick={() => handleAcceptRequest(request?._id)}
                className="bg-accent font-medium text-white px-4 h-9 rounded-md"
              >
                Accept Request
              </button>
              <button
                onClick={() => handleOpenModal(request?._id)}
                className="border-2 border-red-600 text-red-600 font-medium px-4 h-9 rounded-md"
              >
                Reject Request
              </button>
            </div>
          </div>
        );
      })}
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h4 className="text-lg font-bold text-center">
            Give a rejected feedback
          </h4>
          {
            errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>
          }
          <form onSubmit={handleRejectedFeedback} className="mt-2">
            <textarea
              className="border-2 rounded-md p-4 w-full mt-3 h-40 resize-none outline-accent"
              name="feedback"
              placeholder="Why you are rejecting..."
            ></textarea>
            <button className="nbtn w-full mt-4 flex items-center justify-center py-2">{submitLoading ? <span className="loading loading-spinner loading-md"></span> : "Submit Rejected"}</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default PendingRequests;
