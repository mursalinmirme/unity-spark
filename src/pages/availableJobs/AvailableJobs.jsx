import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import Loading from "../components/Loading/Loading";
import "./searchAnimation.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AvailableJobs = () => {
  const PublicAxios = useAxiosPublic()
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValues, setSearchValues] = useState(null);
  const [sortDate, setSortDate] = useState(null);
  const [jobType, setJobType] = useState(null);
  const [workType, setWorkType] = useState(null);
  const navigate = useNavigate();

  // fetch all jobs cards
  const { data: getTotalJobsNumber = [] } = useQuery({
    queryKey: [
      "getTotalAvailableJobNumbers",
      currentPage,
      searchValues,
      sortDate,
      jobType,
      workType,
    ],
    queryFn: async () => {
      const result = await PublicAxios.get(
        `/available-total-jobs-numbers?searching=${searchValues}&sortdate=${sortDate}&jobtypes=${jobType}&worktype=${workType}`
      );
      setTotalPages(Math.ceil(result?.data.total / 5));
      console.log("The current documents number is", result?.data);
      return result.data;
    },
  });

  // fetch all jobs cards
  const { data: allJobs = [], isFetching } = useQuery({
    queryKey: [
      "allJobsAds",
      currentPage,
      searchValues,
      sortDate,
      jobType,
      workType,
    ],
    queryFn: async () => {
      const result = await PublicAxios.get(
        `/job-ads?skip=${
          currentPage * 5
        }&searching=${searchValues}&sortdate=${sortDate}&jobtypes=${jobType}&worktype=${workType}`
      );
      return result.data;
    },
  });

  // handle next btn pagination
  const handleRightPagi = () => {
    if (currentPage + 1 < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // handle previous btn pagination
  const handlePagiBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pagesArray = Array.from({ length: totalPages }, (_, index) => index);

  const handleSearches = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchVal = form.search.value;
    if (!searchVal) {
      return;
    }
    console.log("Does it overtake");
    setSearchValues(searchVal);
  };

  // handle close search bar
  const handleCloseSearchBar = () => {
    setShowSearchBar(false);
    setSearchValues(null);
  };

  // handle fatch jobs by users wanted date
  const handleDateOnchange = (date) => {
    setSearchValues(null);
    setJobType(null);
    setWorkType(null);
    setSortDate(date.target.value);
    console.log(sortDate);
  };

  // handle fatch jobs by users wanted date
  const handleJobTypeOnchange = (jbType) => {
    setSearchValues(null);
    setSortDate(null);
    setWorkType(null);
    setJobType(jbType.target.value);
  };

  // handle fatch jobs by users wanted date
  const handleWorkTypeOnchange = (wkType) => {
    setSearchValues(null);
    setSortDate(null);
    setJobType(null);
    setWorkType(wkType.target.value);
  };


  if (isFetching) {
    return (
      <div className="mb-14 max-w-[92%] lg:max-w-[1200px] mx-auto">
      <div className="px-5 py-8 mt-6 skeleton bg-[#faf8f8]">
                <div>
                  <h3 className="text-2xl skeleton w-32 h-8 bg-[#efeded]"></h3>
                  <div className="flex items-center mt-5 gap-x-5">
                    <span className="skeleton w-20 h-6 bg-[#efeded]"></span>
                    <span className="skeleton w-20 h-6 bg-[#efeded]"></span>
                  </div>
                  <div className="flex items-center gap-5 mt-3">
                    <p className="skeleton w-48 h-6 bg-[#efeded]">
                    </p>
                    <span className="skeleton w-2 h-6 bg-[#efeded]"></span>
                    <p className="my-1 skeleton w-48 h-6 bg-[#efeded]">

                    </p>
                  </div>
                  <p className="my-1 skeleton w-full h-10 bg-[#efeded]">
                  </p>
                  <div className="card-actions justify-start items-center">
                    <button
                      className="mt-3 mr-3 skeleton w-40 h-10 bg-[#efeded]"
                    >
                    </button>

                    <button
                      className="mt-3 mr-3 skeleton w-40 h-10 bg-[#efeded]"
                    >
                    </button>
                  </div>
                </div>
      </div>
      <div className="px-5 py-8 mt-6 skeleton bg-[#faf8f8]">
                <div>
                  <h3 className="text-2xl skeleton w-32 h-8 bg-[#efeded]"></h3>
                  <div className="flex items-center mt-5 gap-x-5">
                    <span className="skeleton w-20 h-6 bg-[#efeded]"></span>
                    <span className="skeleton w-20 h-6 bg-[#efeded]"></span>
                  </div>
                  <div className="flex items-center gap-5 mt-3">
                    <p className="skeleton w-48 h-6 bg-[#efeded]">
                    </p>
                    <span className="skeleton w-2 h-6 bg-[#efeded]"></span>
                    <p className="my-1 skeleton w-48 h-6 bg-[#efeded]">

                    </p>
                  </div>
                  <p className="my-1 skeleton w-full h-10 bg-[#efeded]">
                  </p>
                  <div className="card-actions justify-start items-center">
                    <button
                      className="mt-3 mr-3 skeleton w-40 h-10 bg-[#efeded]"
                    >
                    </button>

                    <button
                      className="mt-3 mr-3 skeleton w-40 h-10 bg-[#efeded]"
                    >
                    </button>
                  </div>
                </div>
      </div>
      </div>
    )
  }

  return (
    <div className="mt-6 max-w-[92%] lg:max-w-[1200px] mx-auto">
      {/* top */}
      <div className="flex flex-col-reverse  md:flex-row justify-between items-center">
        <div className="space-x-2 mt-5 md:mt-0">
          <select
            onChange={handleDateOnchange}
            className="border-2 border-primary p-0.5 md:p-1.5 text-primary font-medium rounded-lg space-y-2 text-sm md:text-base"
            name=""
            id=""
          >
            <option value="">Date</option>
            <option value="1">Today</option>
            <option value="3">Last 3 days</option>
            <option value="7">Last 7 days</option>
            <option value="15">Last 15 days</option>
            <option value="30">Last 30 days</option>
          </select>
          <select
            onChange={handleJobTypeOnchange}
            className="border-2 border-primary p-0.5 md:p-1.5 text-primary font-medium rounded-lg text-sm md:text-base"
            name=""
            id=""
          >
            <option value="null">Job Type</option>
            <option value="On-site">On-site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <select
            onChange={handleWorkTypeOnchange}
            className="border-2 border-primary p-0.5 md:p-1.5 text-primary font-medium rounded-lg text-sm md:text-base"
            name=""
            id=""
          >
            <option value="null">Work Type</option>
            <option value="Intern">Intern</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div className="flex gap-2">
          <form
            onSubmit={handleSearches}
            className={`p-0 border-0 m-0 search-box ${
              showSearchBar && "active-search"
            }`}
          >
            <input
              name="search"
              defaultValue={searchValues}
              type="text"
              className=""
              placeholder="Search..."
            />
            <div>
              <button
                onClick={() => setShowSearchBar(true)}
                style={{ background: "#433EBE" }}
                className="search-btn"
              >
                <IoIosSearch className="text-xl text-white"></IoIosSearch>
              </button>
            </div>
            <div>
              {showSearchBar && (
                <button
                  onClick={handleCloseSearchBar}
                  className="rounded-none bg-none text-primary cancel-btn"
                >
                  <ImCross></ImCross>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {/* middle */}
      {allJobs?.length === 0 ? (
        <div className="flex justify-center items-center h-72">
          <h3 className="text-lg font-medium text-primary">
            There has no jobs with your requirement.
          </h3>
        </div>
      ) : (
        <div className="mb-10">
          {/* card 1 */}
          {allJobs?.map((job) => {
            return (
              <div key={job?._id} className="job_post_card mt-6">
                <div>
                  <h3 className="text-2xl">{job?.job_title}</h3>
                  <div className="job_status">
                    <span>{job?.job_category1}</span>
                    <span>{job?.job_category2}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:gap-5 ">
                    <p>
                      {" "}
                      <span>Salary :</span> {job?.salary} per year
                    </p>
                    <p className="hidden md:block">|</p>
                    <p className="my-1">
                      {" "}
                      <span>Posted :</span>{" "}
                      {moment(job?.createdAt).local().fromNow()}
                    </p>
                  </div>
                  <p>
                    {job?.job_description?.length > 250
                      ? job?.job_description.slice(0, 250) + "..."
                      : job?.job_description}
                  </p>
                  <div className="card-actions justify-start items-center">
                    <Link to={`/apply-job/${job?._id}`}>
                    <button
                      className="mt-3 mr-3 nbtn"
                    >
                      Apply Now
                    </button></Link>

                    <Link to={`/job-details/${job?._id}`}>
                      <div className="mt-3 mr-3 text-primary font-semibold cursor-pointer px-5 py-2 rounded-xl border-2 border-primary text-[15px]">
                        View Details
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* bottom */}
      <div className={`flex justify-center pt-5 pb-10 ${getTotalJobsNumber?.total > 5 ? 'block' : 'hidden'}`}>
        <div className={`join flex space-x-3`}>
          <button
            onClick={handlePagiBack}
            className={`join-item text-lg px-2 h-8 md:px-3 md:h-10 ${currentPage === 0 ? 'text-[#ffffff] bg-[#d9d9db]':'bg-[#d0ceee] text-[#433EBE]'}`}
          >
            <IoIosArrowBack></IoIosArrowBack>
          </button>
          {pagesArray?.map((page, index) => {
            return (
              <button
                onClick={() => setCurrentPage(page)}
                key={index}
                style={{
                  background: `${currentPage == page ? "#433EBE" : "#d0ceee"}`,
                  color: `${currentPage == page ? "#FFFFFF" : "#433EBE"}`,
                  borderRadius: "5px",
                  fontSize: "18px",
                }}
                className="join-item px-3 h-8 md:px-4 md:h-10 font-semibold"
              >
                {page + 1}
              </button>
            );
          })}
          <button
            onClick={handleRightPagi}
            className={`join-item text-lg px-2 h-8 md:px-3 md:h-10 ${totalPages === currentPage + 1 ? 'text-[#ffffff] bg-[#d9d9db]':'bg-[#d0ceee] text-[#433EBE]'}`}
          >
            <IoIosArrowForward></IoIosArrowForward>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailableJobs;
