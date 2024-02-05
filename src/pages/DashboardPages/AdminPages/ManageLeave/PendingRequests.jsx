import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const PendingRequests = () => {
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
        confirmButtonText: "Yes, Confirmed"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosPublic.put(`/leaves-confirm/${acceptId}`, {status: "Confirmed"})
            .then(res => {
                Swal.fire({
                    title: "Confirmed",
                    text: "Leave confirmation successfully",
                    icon: "success"
                  });
                  refetch();
            })
            .catch(err => {
                console.log(err.message);
            })
        }
      });

  }
//   handle reject leave
  const handleRejectRequest = (rejectId) => {

    Swal.fire({
        title: "Are you sure?",
        text: "You want to reject this leave request",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Rejected"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosPublic.put(`/leaves-confirm/${rejectId}`, {status: "Rejected"})
            .then(res => {
                Swal.fire({
                    title: "Confirmed",
                    text: "Leave confirmation successfully",
                    icon: "success"
                  });
                  refetch();
            })
            .catch(err => {
                console.log(err.message);
            })
        }
      });

  }



  return (
    <div className="mt-3 grid grid-cols-2 gap-5">
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
              <button onClick={() => handleAcceptRequest(request?._id)} className="bg-accent font-medium text-white px-4 h-9 rounded-md">
                Accept Request
              </button>
              <button onClick={() => handleRejectRequest(request?._id)} className="border-2 border-red-600 text-red-600 font-medium px-4 h-9 rounded-md">
                Reject Request
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PendingRequests;
