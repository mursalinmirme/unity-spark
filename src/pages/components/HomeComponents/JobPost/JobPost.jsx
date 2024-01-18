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
        Our Recent Job Post{" "}
<<<<<<< HEAD:src/pages/home/JobPost/JobPost.jsx
      </h2>
      <p className="text-center lg:w-[696px] mx-auto text-[#1E1E1E] mt-2 mb-8">
        {" "}
        Our solutions are useful for driving innovation, fostering
        collaboration, and achieving success in your business endeavors.
      </p>
=======
      </h1>
>>>>>>> bd3e9eb26df4fd6dd0c36ecec6b0b255c654ad6f:src/pages/components/HomeComponents/JobPost/JobPost.jsx

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-11/12 mx-auto gap-7 px-2 md:px-3 mb-10">
        {jobPosts.map((jobPost) => (
          <JobPostCard key={jobPost.id} jobPost={jobPost}></JobPostCard>
        ))}
      </div>

      {/* <div className="text-center my-5 mb-10">
        <button className="btn bg-[#25857A] hover:bg-[#14ae5c] text-white font-bold ">
          {" "}
          See All Jobs
        </button>
      </div> */}
    </div>
  );
};

export default JobPost;
