import { Link } from "react-router-dom";

const JobPostCard = ({ jobPost }) => {
  const {
    job_title,
    salary,
    job_posted,
    job_category1,
    job_category2,
    job_description,
    id,
  } = jobPost;

  return (
    <div className="job_post_card">
      <div>
        <h3> {job_title}</h3>
        <div className="job_status">
          <span>{job_category1}</span>
          <span>{job_category2}</span>
        </div>
        <div className="flex items-center gap-5 ">
          <p>
            {" "}
            <strong>Salary:</strong> {salary}
          </p>
          |
          <p className="my-1">
            {" "}
            <strong>Posted</strong> {job_posted}
          </p>
        </div>
        <p>{job_description}</p>
        <div className="card-actions justify-start">
          <button className="mt-3 mr-3">Apply Now</button>
          <Link to={`details/${id}`}>
            <div className="mt-3 mr-3 text-primary  cursor-pointer px-5 py-1.5 rounded-xl border-2 border-primary text-[15px]">
              View Details
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobPostCard;
