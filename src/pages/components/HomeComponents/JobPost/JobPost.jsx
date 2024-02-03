import JobPostCard from "./JobPostCard";
import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const JobPost = () => {
  const PublicAxios = useAxiosPublic()
  const { data: jobPosts = [] } = useQuery({
    queryKey: ["recentFeaturedJobs"],
    queryFn: async () => {
      const result = await PublicAxios.get("/featured-jobs");
      return result.data;
    },
  });

  return (
    <div className="job_posts py-12">
      <h2>Recent Job Post</h2>
      <h6 className="pb-4">Our Latest Job Openings Await Your Talent!</h6>
      <div className="space-y-5 lg:space-y-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        {jobPosts.map((jobPost) => (
          <JobPostCard key={jobPost._id} jobPost={jobPost}></JobPostCard>
        ))}
      </div>

      <div className="text-center py-5">
        <Link to={"/available-jobs"}>
          <button className="nbtn"> Explore more Jobs</button>
        </Link>
      </div>
    </div>
  );
};

export default JobPost;
