import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useContext, useState } from "react";
import { toast } from 'sonner';
import { GoDotFill } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../../../Provider/AuthProvider";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import useUserRole from "../../../../../hooks/useUserRole";
import JobApplyForm from "../JobApplyForm";
import JobDetailsSkeleton from "./JobDetailsSkeleton";

const JobDetails = () => {
  const PublicAxios = useAxiosPublic();
  const { id } = useParams();
  const [currentAds, setCurrentAds] = useState(id);
  const { user } = useContext(AuthContext);
  const [isUser] = useUserRole();
  const [isSaving, setIsSaving] = useState(false);
  console.log(isUser?.role);

  // get current page job info
  const { data: jobInfo, isFetching } = useQuery({
    queryKey: ["jobsDetails", currentAds],
    queryFn: async () => {
      const result = await PublicAxios.get(`/job-ads/${currentAds}`);
      return result.data;
    },
  });

  // get see more jobs based on job type type
  const { data: moreJobs, isLoading } = useQuery({
    queryKey: ["seeMoreJobs", currentAds],
    enabled: !!jobInfo?.job_title,
    queryFn: async () => {
      const result = await PublicAxios.get(
        `/similar_jobs?job_title=${jobInfo?.job_title}&jobType=${jobInfo?.job_category1}&workType=${jobInfo?.job_category2}&jobId=${jobInfo?._id}`
      );
      console.log("see more jobs result is", result.data);
      return result.data;
    },
  });

  // Data Save Job info post Method,,
  const handlerSaveJobInfo = (jobInfo) => {
    setIsSaving(true);
    const saveInfo = {
      title: jobInfo?.job_title,
      position: jobInfo?.position,
      description: jobInfo?.job_description,
      email: user?.email,
      applicationId: jobInfo?._id,
      job_category1: jobInfo?.job_category1,
      job_category2: jobInfo?.job_category2,
    };

    PublicAxios.post(`/saveJobInfo?email=${user?.email}`, saveInfo)
      .then((res) => {
        if (res?.data === "All Ready Data Saved") {
          toast.error("You have already saved the job");
          setIsSaving(false);
        } else {
          toast.success("Job saved successfully");
          setIsSaving(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };


  // skeleton display when fetching the data

  if (isFetching || isLoading) {
    return <JobDetailsSkeleton></JobDetailsSkeleton>;
  }

  return (
    <div className="max-w-[92%] lg:max-w-[1200px] mx-auto">
      <div className="lg:px-10 mb-20 flex flex-col lg:flex-row gap-8">
      {/**Left Side */}
      <div className="mt-10 space-y-2.5 content-container text-[#1E1E1E] text-[18px] flex-1">
        <h3 className="text-3xl md:text-4xl font-semibold mb-5">
          {" "}
          {jobInfo?.job_title}{" "}
        </h3>
        <p className="text-base md:text-lg">
          <span className="mr-1">Job Type :</span> {jobInfo?.job_category1}
        </p>

        <p className="pt-1 text-base md:text-lg">
          <span className="mr-1">Work Type :</span> {jobInfo?.job_category2}
        </p>
        <p className="pt-1">
          <span className="mr-1">Salary : </span> {jobInfo?.salary}
        </p>
        <p className="pt-1 text-base md:text-lg">
          {" "}
          <span className="mr-1"> Position : </span> {jobInfo?.position}
        </p>

        {/** Skills RequireMent Show */}
        <div className="pt-1 text-base md:text-lg">
          <h4>
            {" "}
            <p className="mb-1">
              {" "}
              <span>Required Skills:</span>
            </p>
            {jobInfo?.required_Skills?.map((require) => (
              <div key={require?._id} className="md:ml-20 ">
                {" "}
                <p className="flex items-center gap-2">
                  {" "}
                  <GoDotFill className="text-[#ababab]" /> {require}{" "}
                </p>{" "}
              </div>
            ))}
          </h4>
        </div>

        {/** Additional RequireMent Show */}
        <div className="py-3">
          <h4>
            {" "}
            <p className="mb-1 text-base md:text-lg">
              {" "}
              <span> Additional Requirement:</span>
            </p>
            {jobInfo?.additional_Require?.map((adition) => (
              <div key={adition?._id} className="md:ml-20 ">
                {" "}
                <p className="flex gap-2 items-center text-base md:text-lg">
                  {" "}
                  <GoDotFill className="text-[#ababab]" /> {adition}{" "}
                </p>{" "}
              </div>
            ))}
          </h4>
        </div>

        {/** Education RequireMent Show */}
        <div className="py-3">
          <h4>
            {" "}
            <p className="mb-1 text-base md:text-lg">
              {" "}
              <span> Education Requirement:</span>
            </p>
            {jobInfo?.education_Require?.map((edu) => (
              <div key={edu?._id} className="md:ml-20 text-base md:text-lg">
                {" "}
                <p className="flex gap-2 items-center">
                  {" "}
                  <GoDotFill className="text-[#ababab]" /> {edu}{" "}
                </p>{" "}
              </div>
            ))}
          </h4>
        </div>

        {/** Benefits: RequireMent Show */}
        <div className="py-3">
          <h4>
            {" "}
            <p className="mb-1 text-base md:text-lg">
              {" "}
              <span> Benefits:</span>
            </p>
            {jobInfo?.benefits?.map((beni) => (
              <div key={beni?._id} className="md:ml-20 ">
                {" "}
                <p className="flex gap-2 items-center text-base md:text-lg">
                  {" "}
                  <GoDotFill className="text-[#ababab]" /> {beni}{" "}
                </p>{" "}
              </div>
            ))}
          </h4>
        </div>
        {/* description section */}
        <div className="text-base md:text-lg">
          <span>Description:</span>
          <p>{jobInfo?.job_description}</p>
        </div>

        <div className={`flex items-center gap-4 pt-8 font-semibold`}>
          {user?.email ? (
            <Link to={`/apply-job/${jobInfo?._id}`}>
              <span
                className={`px-8 flex items-center bg-primary text-white rounded-xl cursor-pointer text-[14px] py-3`}
              >
                Apply Now
              </span>
            </Link>
          ) : (
            <Link to={"/signin"}>
              <span className="px-8 flex items-center bg-primary text-white rounded-xl cursor-pointer text-[14px] py-3">
                Apply Now
              </span>
            </Link>
          )}
          {user?.email ? (
            <span
              onClick={() => handlerSaveJobInfo(jobInfo)}
              className={`px-8 h-11 flex justify-center items-center text-primary border-2 border-primary  rounded-xl cursor-pointer text-[15px]`}
            >
              {isSaving ? <span className="loading loading-spinner loading-md p-0"></span> : 'Save'}
            </span>
          ) : (
            <Link to={"/signin"}>
              <span
                className="px-8 py-2.5 text-primary border-2 border-primary  rounded-xl cursor-pointer text-[15px]"
              >
                Save
              </span>
            </Link>
          )}
        </div>
      </div>

      {/**Right Side */}
      <div className="mt-10 p-2 lg:w-96">
        <h1 className="text-2xl font-semibold mb-5"> Find Out More ....</h1>

        {moreJobs?.length > 0 ? (
          <div className="space-y-5">
            {moreJobs?.map((jobPost) => (
              <div key={jobPost?._id} className="job_post_card">
                <div>
                  <h3> {jobPost?.job_title}</h3>
                  <div className="job_status">
                    <span> {jobPost?.job_category1}</span>
                    <span>{jobPost?.job_category2}</span>
                  </div>
                  <div className="flex items-center gap-5 ">
                    <p>
                      {" "}
                      <span>Salary :</span> {jobPost?.salary}
                    </p>
                    |
                    <p className="my-1">
                      {moment(jobPost?.createdAt).local().fromNow()}
                    </p>
                  </div>
                  <p className="mt-1">
                    {jobPost?.job_description.length > 180
                      ? jobPost?.job_description.slice(0, 180) + "..."
                      : jobPost?.job_description}
                  </p>
                  <div className="flex card-actions items-center justify-start mt-4 gap-4">
                    {user?.email ? (
                      <Link to={`/apply-job/${jobPost?._id}`}>
                        <span
                          className={`px-8 flex items-center bg-primary text-white rounded-xl cursor-pointer text-[14px] py-3`}
                        >
                          Apply Now
                        </span>
                      </Link>
                    ) : (
                      <Link to={"/signin"}>
                        <span className="px-8 flex items-center bg-primary text-white rounded-xl cursor-pointer text-[14px] py-3">
                          Apply Now
                        </span>
                      </Link>
                    )}
                    <Link
                      onClick={() => setCurrentAds(jobPost?._id)}
                      to={`/job-details/${jobPost?._id}`}
                    >
                      <div className="mr-3 text-primary font-semibold  cursor-pointer px-4 py-[9px] rounded-xl border-2 border-primary text-[15px]">
                        View Details
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg h-40 flex justify-center items-center font-medium">
            There has no similar job title ads
          </div>
        )}
        <div
          className={`text-center pt-10 ${
            moreJobs?.length > 0 ? "block" : "hidden"
          }`}
        >
          <Link to={"/available-jobs"}>
            <span className="px-6 py-2.5 mx-auto bg-primary text-white font-medium rounded-md cursor-pointer text-[15px]">
              See More
            </span>
          </Link>
        </div>
      </div>

      {/* MODAL */}
      <JobApplyForm></JobApplyForm>
    </div>
    </div>
  );
};

export default JobDetails;
