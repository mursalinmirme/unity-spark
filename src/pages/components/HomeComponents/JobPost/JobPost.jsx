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
    <div className="job_posts py-12">
      <h2>Recent Job Post</h2>
      <h6 className="pb-4">Our Latest Job Openings Await Your Talent!</h6>
      <div className="space-y-5">
        {jobPosts.map((jobPost) => (
          <JobPostCard key={jobPost.id} jobPost={jobPost}></JobPostCard>
        ))}
      </div>

      <div className="text-center py-5">
        <button className="btn text-white"> Explore more Jobs</button>
      </div>
    </div>
  );
};

export default JobPost;
