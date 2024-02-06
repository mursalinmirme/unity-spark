import { LuPenLine } from "react-icons/lu";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import LeavesRow from "./LeavesRow";
// import LeavesRow from "./LeavesRow";

const LeaveManagement = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: userLeaves = [] } = useQuery({
    queryKey: ["uniqueUserLeaves"],

    queryFn: async () => {
      const result = await axiosPublic.get(`/leaves/${user?.email}`);
      return result.data;
    },
  });

  console.log("checked", userLeaves);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-semibold">Leave Requests</h3>

        <Link to="/dashboard/newLeaveRequest">
          <p className="flex items-center gap-2 text-[#433ebe] font-inter font-semibold border-2 border-[#433ebe] p-1 md:px-2 rounded-lg">
            <LuPenLine></LuPenLine> <span>New Request</span>
          </p>
        </Link>
      </div>

      <div>
        <table className="table-no-border table mt-10">
          {/* head */}
          <thead className="bg-[#726eec] text-white text-[18px] rounded-md text-center">
            <tr className="text-center">
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
                <LeavesRow key={leave._id} leave={leave} idx={idx}></LeavesRow>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagement;
