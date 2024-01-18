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
    <div className="card bg-base-100 shadow-sm border ">
      <div className="card-body -mt-2">
        <h2 className="card-title"> {job_title}</h2>

        <div>
          <button className="btn btn-sm mr-2 bg-[#427AA1] hover:bg-[#14ae5c] w-[88px] rounded-full text-[13px] text-white">
            {job_category1}
          </button>
          <button className="btn btn-sm bg-[#427AA1] hover:bg-[#14ae5c] w-[88px] text-[12px] rounded-full text-white">
            {job_category2}
          </button>
        </div>
        <p className="text-[#1E1E1E]">Salary : {salary}</p>
        <p className="text-[#1E1E1E]"> Posted {job_posted}</p>

        <p>{job_description}</p>
        <div className="card-actions ">
          <button className="btn  button bg-[#14ae5c]  hover:bg-[#248479] text-white mt-2">
            {" "}
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPostCard;
