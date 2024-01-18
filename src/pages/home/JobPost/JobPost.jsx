import { useEffect, useState } from "react";
import JobPostCard from "./JobPostCard";

const JobPost = () => {
  const [jobPosts, serJobPosts] = useState([]);

  useEffect(() => {
    fetch("/JobPost.json")
      .then((res) => res.json())
      .then((data) => serJobPosts(data));
  }, []);
  return (
    <div>
      <h2 className="text-4xl text-center text-[#1E1E1E] font-bold mb-1 mt-7">
        {" "}
        Our Recent Job Post just Now{" "}
      </h2>
      <p className="text-center lg:w-[696px] mx-auto text-[#1E1E1E] mt-2 mb-8">
        {" "}
        Our solutions are useful for driving innovation, fostering
        collaboration, and achieving success in your business endeavors.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-11/12 mx-auto gap-7 px-2 md:px-3 mb-10">
        {jobPosts.map((jobPost) => (
          <JobPostCard key={jobPost.id} jobPost={jobPost}></JobPostCard>
        ))}
      </div>
    </div>
  );
};

export default JobPost;
