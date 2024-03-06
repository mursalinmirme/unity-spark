import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import MySaveJobSkeleton from "./MySaveJobSkeleton";

const MySaveJob = () => {
  const PublicAxios = useAxiosPublic();
  const { user } = useContext(AuthContext);
  // get current page job info
  const {
    data: saveJobInfos,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["saveJobInfos", user?.email],
    queryFn: async () => {
      const result = await PublicAxios.get(`/getSaveInfo/${user?.email}`);
      return result.data;
    },
  });

  //   /saveJobs/:id

  const handlerDeleted = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        PublicAxios.delete(`/saveJobs/${id}`)
          .then((res) => {
            console.log(res);
            refetch();
          })
          .catch((error) => {
            console.log(error.message);
          });

        Swal.fire({
          title: "Deleted!",
          text: "Your save job has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (isFetching) {
    return <MySaveJobSkeleton></MySaveJobSkeleton>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold"> My saved jobs</h1>

      {saveJobInfos?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
          {saveJobInfos?.map((job) => (
            <div key={job?._id} className="">
              <div
                className="p-4 bg-base-100 rounded-xl"
                style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
              >
                <div className="">
                  <h2 className="card-title font-inter">{job?.title}</h2>
                  <p className="mt-1">
                    <span className="font-semibold"> Position :</span>{" "}
                    {job?.position}
                  </p>
                  {/* <div className="flex gap-8">
                  <p className="pt-1 text-base md:text-lg">
                    <span className="mr-1 font-semibold">Job Type :</span>{" "}
                    {job?.job_category1}
                  </p>
                  <p className="pt-1 text-base md:text-lg">
                    <span className="mr-1 font-semibold">Work Type :</span>{" "}
                    {job?.job_category2}
                  </p>
                </div> */}
                  <p className="pb-2 pt-1">
                    {" "}
                    {job?.description
                      ? job?.description.slice(0, 80) + "..."
                      : job?.description}{" "}
                  </p>
                  <div className="card-actions gap-4 justify-start mt-2 ">
                    <Link to={`/job-details/${job?.applicationId}`}>
                      <button className=" btn-sm bg-second text-white hover:bg-none rounded-md font-inter font-medium">
                        Details
                      </button>
                    </Link>

                    <button
                      onClick={() => handlerDeleted(job?._id)}
                      className=" btn-sm  bg-[#dd3333] text-white rounded-md  font-inter font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h4 className="text-xl font-semibold flex justify-center items-center h-[70vh]">{`You don't have any saved jobs yet!`}</h4>
        </div>
      )}
    </div>
  );
};

export default MySaveJob;
