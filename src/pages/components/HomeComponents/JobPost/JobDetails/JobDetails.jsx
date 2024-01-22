import { useParams } from "react-router-dom";
import useJob from "../../../../../hooks/useJob";
import { GoDotFill } from "react-icons/go";
import toast from "react-hot-toast";
import JobPostCard from "../JobPostCard";

const JobDetails = () => {
  const [jobs] = useJob();
  const { id } = useParams();

  const job = jobs?.find((job) => job?.id === parseInt(id));

  return (
    <div className="px-10 my-20 grid md:grid-cols-2">
      {/**Left Side */}
      <div className="mt-10 space-y-1  text-[#1E1E1E] text-[18px]">
        <h3 className="text-4xl font-semibold mb-5"> {job?.job_title} </h3>
        <p>
          <strong className="mr-1">Job Type :</strong> {job?.job_category1}
        </p>

        <p>
          <strong className="mr-1">Work Type :</strong> {job?.job_category2}
        </p>
        <p>
          <strong className="mr-1">Salary : </strong> {job?.salary}
        </p>
        <p>
          {" "}
          <strong className="mr-1"> Position : </strong> {job?.position}
        </p>

        {/** Skills RequireMent Show */}
        <div>
          <h4>
            {" "}
            <p className="mb-1">
              {" "}
              <strong> Required Skills:</strong>
            </p>
            {job?.required_Skills?.map((require) => (
              <div key={job.id} className="ml-20 ">
                {" "}
                <p className="flex gap-2">
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
            <p className="mb-1">
              {" "}
              <strong> Additional Requirement:</strong>
            </p>
            {job?.additional_Require?.map((require) => (
              <div key={job.id} className="ml-20 ">
                {" "}
                <p className="flex gap-2">
                  {" "}
                  <GoDotFill className="text-[#D9D9D9]" /> {require}{" "}
                </p>{" "}
              </div>
            ))}
          </h4>
        </div>

        {/** Education RequireMent Show */}
        <div className="py-3">
          <h4>
            {" "}
            <p className="mb-1">
              {" "}
              <strong> Education Requirement:</strong>
            </p>
            {job?.education_Require?.map((require) => (
              <div key={job.id} className="ml-20 ">
                {" "}
                <p className="flex gap-2">
                  {" "}
                  <GoDotFill className="text-[#D9D9D9]" /> {require}{" "}
                </p>{" "}
              </div>
            ))}
          </h4>
        </div>

        {/** Benefits: RequireMent Show */}
        <div className="py-3">
          <h4>
            {" "}
            <p className="mb-1">
              {" "}
              <strong> Benefits:</strong>
            </p>
            {job?.benefits?.map((require) => (
              <div key={job.id} className="ml-20 ">
                {" "}
                <p className="flex gap-2">
                  {" "}
                  <GoDotFill className="text-[#D9D9D9]" /> {require}{" "}
                </p>{" "}
              </div>
            ))}
          </h4>
        </div>

        <div className="flex gap-4">
          <span
            className="px-4 py-2 bg-primary text-white rounded-xl cursor-pointer text-[14px]"
            onClick={() => toast.success(" Your Job Apple Successful ")}
          >
            {" "}
            Apple Now{" "}
          </span>
          <span
            onClick={() => toast.success(" Save Successful ")}
            className="px-6 py-2 bg-primary text-white rounded-xl cursor-pointer text-[14px]"
          >
            {" "}
            Save{" "}
          </span>
        </div>
      </div>

      {/**Right Side */}
      <div className="mt-10 p-2">
        <h1 className="text-2xl font-semibold mb-5"> Find Out More ....</h1>

        <div className="space-y-5">
          {jobs?.map((jobPost) => (
            <JobPostCard key={jobPost.id} jobPost={jobPost}></JobPostCard>
          ))}
        </div>
        <div className="text-center pt-10 ">
          <span className="px-6 py-2.5 mx-auto bg-primary text-white rounded-xl cursor-pointer text-[14px]">
            {" "}
            See More{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
