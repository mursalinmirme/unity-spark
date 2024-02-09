import moment from "moment";
import { Link } from "react-router-dom";

const JobPostCard = ({ jobPost }) => {
  const {
    job_title,
    salary,
    createdAt,
    job_category1,
    job_category2,
    job_description,
    _id,
  } = jobPost;

  return (
    <div className="job_post_card">
      <div>
        <h3> {job_title}</h3>
        <div className="job_status">
          <span className="category">{job_category1}</span>
          <span>{job_category2}</span>
        </div>

        <p>
          {" "}
          <strong>Salary:</strong> {salary}
        </p>

        <p className="my-1">
          {" "}
          <strong>Posted:</strong> {moment(createdAt).startOf("day").fromNow()}
        </p>

        <p>
          {job_description?.length > 110
            ? job_description.slice(0, 110) + "..."
            : job_description}
        </p>
        <div className="card-actions flex items-center justify-start ">
          <button className="mt-3 mr-3 nbtn">Apply Now</button>
          <Link to={`/job-details/${_id}`}>
            <div className="mt-3 mr-3 text-primary font-semibold cursor-pointer px-5 py-[9px] rounded-xl border-2 border-primary text-[15px]">
              Details
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobPostCard;
