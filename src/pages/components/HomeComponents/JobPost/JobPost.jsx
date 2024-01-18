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
      <h2>Our Recent Job Post</h2>
      <h6>Our solutions are useful for driving innovation, fostering collaboration, and achieving success in your business endeavors.</h6>
      <div className="posts_container">
        {jobPosts.map((jobPost) => (
          <JobPostCard key={jobPost.id} jobPost={jobPost}></JobPostCard>
        ))}
      </div>
    </div>
  );
};

export default JobPost;
