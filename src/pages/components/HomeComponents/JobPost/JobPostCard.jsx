const JobPostCard = ({ jobPost }) => {
  const {
    job_title,
    salary,
    job_posted,
    job_category1,
    job_category2,
    job_description,
  } = jobPost;

  return (
    <div className="job_post_card">
      <div>
        <h3> {job_title}</h3>
        <div className="job_status">
          <span>{job_category1}</span>
          <span>{job_category2}</span>
        </div>
        <p><span>Salary:</span> {salary}</p>
        <p className="my-1">Posted {job_posted}</p>
        <p>{job_description}</p>
        <button className="mt-3">Apply Now</button>
      </div>
    </div>
  );
};

export default JobPostCard;
