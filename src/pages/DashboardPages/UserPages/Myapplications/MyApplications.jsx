import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import moment from "moment";
import { Link } from "react-router-dom";
import MyApplicationsSkeleton from "./MyApplicationsSkeleton";

const MyApplications = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: myApplications = [], isFetching } = useQuery({
    queryKey: ["myApplicatins"],
    queryFn: async () => {
      const result = await axiosPublic.get(
        `/my-applications?email=${user?.email}`
      );
      console.log("check num", result.data);
      return result?.data;
    },
  });
  console.log("Under the user has total application", myApplications);

  if (isFetching) {
    return <MyApplicationsSkeleton></MyApplicationsSkeleton>;
  }
  return (
    <div>
      <h3 className="text-left text-xl font-semibold border-b pb-5">
        My Applied Applications
      </h3>
      {myApplications?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {myApplications?.map((application) => {
            return (
              <div
                key={application?._id}
                className="border p-4 rounded-md hover:border hover:border-primary hover:-mt-0.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-semibold">
                      {application?.title}
                    </h4>
                    <p className="font-semibold">
                      Status: {application?.status}
                    </p>
                  </div>
                  <p className="text-base mt-1">
                    Application Submitted:{" "}
                    <span className="text-base font-semibold">
                      {moment(application?.createdAt).startOf("day").fromNow()}
                    </span>
                  </p>
                  <Link to={`/job-details/${application?.applied_job_id}`}>
                    <button className="bg-accent text-white px-3 h-9 font-medium mt-3 w-full rounded-md flex justify-center items-center">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[70vh]">
          <h5 className="text-xl font-semibold">{`You don't have applied any jobs yet!`}</h5>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
