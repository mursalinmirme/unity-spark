import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import AcceptAndRejectLeaveSkeleton from "./AcceptAndRejectLeaveSkeleton";

const RejectedRequestes = () => {
    const axiosPublic = useAxiosPublic();
    const { data: leaveRequests = [], isFetching } = useQuery({
      queryKey: ["GetAllLeaveRequests"],
      queryFn: async () => {
        const result = await axiosPublic.get("/leaves-rejected");
        return result.data;
      },
    });
    if(isFetching){
      return <AcceptAndRejectLeaveSkeleton></AcceptAndRejectLeaveSkeleton>
    }
    return (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-5">
      {leaveRequests?.map((request) => {
        return (
          <div className="border shadow-sm p-3.5 rounded-md flex flex-col h-full" key={request?._id}>
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
              <p className="font-normal text-base mt-1 flex-grow line-clamp-3">
                { request?.leaveReason }
              </p>
            </div>
            <div className="mt-3 flex gap-5">
              <button className="font-medium text-red-600 border border-red-600 px-4 h-9 rounded-md">
                Rejected
              </button>
            </div>
          </div>
        );
      })}
        </div>
    );
};

export default RejectedRequestes;