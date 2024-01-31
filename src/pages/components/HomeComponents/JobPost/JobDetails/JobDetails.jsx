import { Link, useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const JobDetails = () => {
  const { id } = useParams();
  const [currentAds, setCurrentAds] = useState(id);
  // const handleReFetch = () => {
  //   refetch();
  //   refetchForMore();
  // }

  // get current page job info
  const { data: jobInfo, refetch } = useQuery({
    queryKey: ["jobsDetails", currentAds],
    queryFn: async () => {
      const result = await axios.get(
        `https://unity-spark-server.vercel.app/job-ads/${currentAds}`
      );
      return result.data;
    },
  });

  // get see more jobs based on job type type
  const { data: moreJobs, refetch: refetchForMore } = useQuery({
    queryKey: ["seeMoreJobs", currentAds],
    enabled: !!jobInfo?.job_category1,
    queryFn: async () => {
      const result = await axios.get(
        `https://unity-spark-server.vercel.app/similar_jobs?jobtype=${jobInfo?.job_category1}`
      );
      console.log("see more jobs result is", result.data);
      return result.data;
    },
  });

  return (
    <div className="lg:px-10 mb-20 flex flex-col lg:flex-row gap-8">
      {/**Left Side */}
      <div className="mt-10 space-y-1 content-container text-[#1E1E1E] text-[18px] flex-1">
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
              <span> Required Skills:</span>
            </p>
            {jobInfo?.required_Skills?.map((require) => (
              <div key={require?.id} className="md:ml-20 ">
                {" "}
                <p className="flex items-center gap-2">
                  {" "}
                  <GoDotFill className="text-[#D9D9D9]" /> {require}{" "}
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
              <div key={adition} className="md:ml-20 ">
                {" "}
                <p className="flex gap-2 items-center text-base md:text-lg">
                  {" "}
                  <GoDotFill className="text-[#D9D9D9]" /> {adition}{" "}
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
              <div key={edu} className="md:ml-20 text-base md:text-lg">
                {" "}
                <p className="flex gap-2 items-center">
                  {" "}
                  <GoDotFill className="text-[#D9D9D9]" /> {edu}{" "}
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
              <div key={beni} className="md:ml-20 ">
                {" "}
                <p className="flex gap-2 items-center text-base md:text-lg">
                  {" "}
                  <GoDotFill className="text-[#D9D9D9]" /> {beni}{" "}
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

        <div className="flex gap-4 pt-8 font-semibold">
          <span
            className="px-8 py-2.5 bg-primary text-white rounded-xl cursor-pointer text-[14px]"
            onClick={() => toast.success("Successfully applied")}
          >
            {" "}
            Apply Now{" "}
          </span>
          <span
            onClick={() => toast.success("Successfully saved")}
            className="px-8 py-2.5 text-primary border-2 border-primary  rounded-xl cursor-pointer text-[14px]"
          >
            {" "}
            Save{" "}
          </span>
        </div>
      </div>

      {/**Right Side */}
      <div className="mt-10 p-2 lg:w-96">
        <h1 className="text-2xl font-semibold mb-5"> Find Out More ....</h1>

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
                    {" "}
                    <span>Posted</span> {jobPost?.job_posted}
                  </p>
                </div>
                <p>{jobPost?.job_description}</p>
                <div className="card-actions justify-start">
                  <button className="mt-3 mr-3">Apply Now</button>
                  <Link
                    onClick={() => setCurrentAds(jobPost?._id)}
                    to={`/job-details/${jobPost?._id}`}
                  >
                    <div className="mt-3 mr-3 text-primary font-semibold  cursor-pointer px-5 py-[10px] rounded-xl border-2 border-primary text-[15px]">
                      View Details
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center pt-10 ">
          <Link to={"/available-jobs"}>
            <span className="px-6 py-2.5 mx-auto bg-primary text-white font-semibold rounded-xl cursor-pointer text-[14px]">
              {" "}
              See More{" "}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
