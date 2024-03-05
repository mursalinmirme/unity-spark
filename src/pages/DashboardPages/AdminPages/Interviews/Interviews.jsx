import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import InterviewsSkeleton from "./InterviewsSkeleton";

const Interviews = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  //   console.log("check", currentDayString);

  const { data: allInterviews, isFetching } = useQuery({
    queryKey: ["allInterviews"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/get-admin-interview/${user?.email}`);
      return res?.data;
    },
  });
  // const currentDate = moment().format("D/M/YYYY");

  // console.log("checked999999", allInterviews);

  return (
    <div>
      <h4 className="text-2xl font-semibold mb-5">My Interviews Candidates</h4>
      <div className="overflow-x-auto">
        <table className="table border">
          {/* head */}
          <thead className="bg-second text-white text-base rounded-md  text-left">
            <tr>
              <th>SL.</th>
              <th> Name</th>
              <th> Email</th>
              <th>Start Time</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          {isFetching ? (
            <InterviewsSkeleton></InterviewsSkeleton>
          ) : (
            <tbody>
              {/* row 1 */}
              {allInterviews?.map((interview, indx) => (
                <tr key={interview?._id} className="text-base">
                  <th>{indx + 1}</th>
                  <td className="text-left">{interview?.candidateName}</td>
                  <td className="text-left ">{interview?.candidateEmail}</td>
                  <td className="text-left">{interview?.startTime}</td>
                  <td className="text-left">{interview?.date}</td>
                  <td className="">
                    <Link to={`/dashboard/interview-details/${interview?._id}`}>
                      <button className="bg-primary px-3 py-2  text-white rounded-md text-xs">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Interviews;
