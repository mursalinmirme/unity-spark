import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import AcceptAndRejectLeaveSkeleton from "./AcceptAndRejectLeaveSkeleton";

const AcceptedRequested = () => {
  const axiosPublic = useAxiosPublic();
  const { data: leaveRequests = [], isFetching } = useQuery({
    queryKey: ["GetAllLeaveRequests"],
    queryFn: async () => {
      const result = await axiosPublic.get("/leaves-confirmed");
      return result.data;
    },
  });

  if (isFetching) {
    return <AcceptAndRejectLeaveSkeleton></AcceptAndRejectLeaveSkeleton>;
  }

  return (
    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-5">
      {leaveRequests?.map((request) => {
        return (
          <div className="border shadow-sm p-3.5 rounded-md" key={request?._id}>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full"
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
              <h3 className="font-semibold text-md mr-4">
                {request?.numberOfDays} Days
              </h3>
            </div>
            <div className="mt-3">
              <p className="text-lg font-medium">
                Subject: <span className="font-normal">{request?.subject}</span>
              </p>
              <p className="font-inter text-base mt-1">
                {request?.leaveReason}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AcceptedRequested;
