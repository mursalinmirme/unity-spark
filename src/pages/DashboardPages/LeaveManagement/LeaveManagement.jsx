import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import LeavesRow from "./LeavesRow";
import LeaveManagementSkeleton from "./LeaveManagementSkeleton";

const LeaveManagement = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: userLeaves = [], isFetching } = useQuery({
    queryKey: ["uniqueUserLeaves"],

    queryFn: async () => {
      const result = await axiosPublic.get(`/leaves/${user?.email}`);
      return result.data;
    },
  });

  if (isFetching) {
    return <LeaveManagementSkeleton></LeaveManagementSkeleton>;
  }

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-xl md:text-2xl font-semibold">
            My Leave Requests
          </h3>

          <Link to="/dashboard/newLeaveRequest">
            <p className="edit_btn">
              <FiPlus className="text-lg"></FiPlus> <span>New Request</span>
            </p>
          </Link>
        </div>

        <div className="overflow-x-auto mt-6">
          {userLeaves?.length > 0 ? (
            <table className="text-left table-no-border w-full">
              {/* head */}
              <thead className="bg-second text-white text-base rounded-md ">
                <tr>
                  <th>Serial</th>
                  <th>Subject</th>
                  <th>Reason</th>
                  <th>Days</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userLeaves &&
                  userLeaves?.map((leave, idx) => (
                    <LeavesRow
                      key={leave._id}
                      leave={leave}
                      idx={idx}
                    ></LeavesRow>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center">
              <h2 className="font-semibold text-2xl font-inter">
                You don{"'"}t have any leave requests
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
