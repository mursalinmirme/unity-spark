import { GoDotFill } from "react-icons/go";

const JobPost = () => {
  return (
    <div>
      <h1 className="text-3xl text-center text-[#248479] font-bold my-7">
        {" "}
        Our Recent Job Post{" "}
      </h1>
      <p> This Testing </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-5  md:px-3 mb-10">
        {/* First div  */}

        <div className="card card-compact  bg-base-100 shadow-sm border p-3 lg:h-[460px]">
          <div className="card-body">
            <h2 className="">
              <strong className="font-semibold text-[16px]">Position : </strong>
              <span className="text-black font-semibold">
                {" "}
                Font-End Developer !{" "}
              </span>
            </h2>

            <div>
              <p className="text-justify">
                {" "}
                We are seeking a talented and motivated Software Engineer to
                join our dynamic team. In this role, you will be responsible for
                developing high-quality software solutions, collaborating with
                cross-functional teams, and contributing to the overall success
                of our projects.
              </p>
              <p className="my-2">
                {" "}
                <strong> Qualification:</strong>{" "}
              </p>

              <div className="flex gap-1 my-1">
                <GoDotFill />
                <p>Bachelor s degree in Computer Science or related field</p>
              </div>
              <strong className="my-3"> Experience:</strong>
              <div className="flex gap-1 my-1">
                <GoDotFill />
                <p> 2 years professional on it field</p>
              </div>

              <p className="my-2">
                {" "}
                <strong>Salary:</strong> 5L (Year)
              </p>
              <p>
                {" "}
                <strong> Deadline :</strong> 2024-02-28
              </p>
            </div>

            <div className="card-actions ">
              <button className="btn  bg-[#14ae5c]  hover:bg-[#248479] text-white mt-2">
                {" "}
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Second div  */}

        <div className="card card-compact  bg-base-100 shadow-sm border p-3 lg:h-[460px">
          <div className="card-body">
            <h2 className="">
              <strong className="font-semibold text-[16px]">Position : </strong>
              <span className="text-black font-semibold">
                {" "}
                FullStack Developer !{" "}
              </span>
            </h2>

            <div>
              <p className="text-justify">
                {" "}
                Seeking a skilled Full Stack Developer to join our team.
                Responsible for end-to-end development, from user interface to
                server-side scripting. Collaborate with cross-functional teams
                to deliver high-quality software solutions. Bring expertise in
                both front-end.
              </p>
              <p className="my-2">
                {" "}
                <strong> Qualification:</strong>{" "}
              </p>

              <div className="flex gap-1 my-1">
                <GoDotFill />
                <p> Degree in Computer Science or related field</p>
              </div>
              <strong className="my-3"> Experience:</strong>
              <div className="flex gap-1 my-1">
                <GoDotFill />
                <p> 3 years professional on it field</p>
              </div>

              <p className="my-2">
                {" "}
                <strong>Salary:</strong> 8L (Year)
              </p>
              <p> ApplicationDeadline: 2024-01-28</p>
            </div>

            <div className="card-actions ">
              <button className="btn  bg-[#14ae5c]  hover:bg-[#248479] text-white mt-2">
                {" "}
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* 3rd div  */}

        <div className="card card-compact  bg-base-100 shadow-sm border p-3 lg:h-[460px]">
          <div className="card-body">
            <h2 className="">
              <strong className="font-semibold text-[16px]">Position : </strong>
              <span className="text-black font-semibold">
                {" "}
                React Developer !
              </span>
            </h2>

            <div>
              <p className="text-justify">
                {" "}
                Hiring a React Developer to craft responsive user interfaces and
                enhance web applications. Proficient in React.js, JavaScript,
                and associated libraries, you all collaborate with teams to
                deliver seamless, efficient, and visually appealing digital
                experiences.
              </p>
              <p className="my-2">
                {" "}
                <strong> Qualification:</strong>{" "}
              </p>

              <div className="flex gap-1 my-1">
                <GoDotFill />
                <p>Bachelor s degree in Computer Science or related field</p>
              </div>
              <strong className="my-3"> Experience:</strong>
              <div className="flex gap-1 my-1">
                <GoDotFill />
                <p> 1 years professional on it field</p>
              </div>

              <p className="my-2">
                {" "}
                <strong>Salary:</strong> 10L (Year)
              </p>
              <p> ApplicationDeadline: 2024-03-25</p>
            </div>

            <div className="card-actions ">
              <button className="btn  bg-[#14ae5c]  hover:bg-[#248479] text-white mt-2">
                {" "}
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center my-5 mb-10">
        <button className="btn bg-[#25857A] hover:bg-[#14ae5c] text-white font-bold ">
          {" "}
          See All Jobs
        </button>
      </div>
    </div>
  );
};

export default JobPost;
