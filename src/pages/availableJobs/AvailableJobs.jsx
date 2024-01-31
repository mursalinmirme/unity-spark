import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import Loading from "../components/Loading/Loading";
const AvailableJobs = () => {
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValues, setSearchValues] = useState(null);
  const [sortDate, setSortDate] = useState(null);
  const [jobType, setJobType] = useState(null);
  const [workType, setWorkType] = useState(null);

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
      const result = await axios.get(
        `http://localhost:5000/available-total-jobs-numbers?searching=${searchValues}&sortdate=${sortDate}&jobtypes=${jobType}&worktype=${workType}`
      );
      setTotalPages(Math.ceil(result?.data.total / 5));
      console.log("The current documents number is", result?.data);
      return result.data;
    },
  });

  // fetch all jobs cards
  const {
    data: allJobs = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [
      "allJobsAds",
      currentPage,
      searchValues,
      sortDate,
      jobType,
      workType,
    ],
    queryFn: async () => {
      const result = await axios.get(
        `http://localhost:5000/job-ads?skip=${
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
    setShowSearchBar(true);
  };

  // handle fatch jobs by users wanted date
  const handleDateOnchange = (date) => {
    setSearchValues(null)
    setJobType(null)
    setWorkType(null)
    setSortDate(date.target.value);
    console.log(sortDate);
  };

  // handle fatch jobs by users wanted date
  const handleJobTypeOnchange = (jbType) => {
    setSearchValues(null)
    setSortDate(null)
    setWorkType(null);
    setJobType(jbType.target.value);
  };

  // handle fatch jobs by users wanted date
  const handleWorkTypeOnchange = (wkType) => {
    setSearchValues(null)
    setSortDate(null)
    setJobType(null);
    setWorkType(wkType.target.value);
  };

  if (isFetching) {
    return <Loading></Loading>;
  }

  return (
    <div className="mt-6">
      {/* top */}
      <div className="flex flex-col-reverse  md:flex-row justify-between items-center">
        <div className="space-x-2 mt-5 md:mt-0">
          <select
            onChange={handleDateOnchange}
            className="border-2 border-primary p-0.5 md:p-1.5 text-primary font-medium rounded-lg space-y-2 text-sm md:text-base"
            name=""
            id="">
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
            id="">
            <option value="null">Job Type</option>
            <option value="On-site">On-site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <select
            onChange={handleWorkTypeOnchange}
            className="border-2 border-primary p-0.5 md:p-1.5 text-primary font-medium rounded-lg text-sm md:text-base"
            name=""
            id="">
            <option value="null">Work Type</option>
            <option value="Intern">Intern</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div className="flex search-animation">
          <form
            onSubmit={handleSearches}
            className={`p-0 border-0 m-0 relative ${
              showSearchBar ? "hidden" : "visible"
            }`}>
            <input
              name="search"
              defaultValue={searchValues}
              className="md:py-1.5 pr-14 m-0 md:w-60 lg:w-80 border-second"
              type="text"
              placeholder="Search..."
            />
            <button
              style={{ background: "#433EBE" }}
              className="bg-primary absolute top-0 right-0 h-full rounded-none rounded-r-lg">
              <IoIosSearch className="text-xl text-white"></IoIosSearch>
            </button>
          </form>
          {showSearchBar ? (
            <button
              onClick={() => setShowSearchBar(false)}
              style={{ background: "#433EBE" }}
              className="rounded-md md:h-[38px] bg-primary">
              <IoIosSearch className="text-xl text-white"></IoIosSearch>
            </button>
          ) : (
            <button
              onClick={handleCloseSearchBar}
              className="rounded-none bg-none text-primary">
              <ImCross></ImCross>
            </button>
          )}
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
                  <div className="flex items-center gap-5 ">
                    <p>
                      {" "}
                      <span>Salary :</span> {job?.salary} per year
                    </p>
                    |
                    <p className="my-1">
                      {" "}
                      <span>Posted :</span>{" "}
                      {moment(job?.createdAt).startOf("day").fromNow()}
                    </p>
                  </div>
                  <p>
                    {job?.job_description?.length > 250
                      ? job?.job_description.slice(0, 250) + "..."
                      : job?.job_description}
                  </p>
                  <div className="card-actions justify-start items-center">
                    <Link to={`/apply-job/${job?._id}`}>
                      <button className="mt-3 mr-3">Apply Now</button>
                    </Link>
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
      <div className={`flex justify-center py-10`}>
        <div className={`join flex space-x-2`}>
          <button
            onClick={handlePagiBack}
            style={{
              background: `${"#d0ceee"}`,
              color: "#433EBE",
              fontSize: "18px",
            }}
            className="join-item btn">
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
                  fontSize: "18px",
                }}
                className="join-item btn">
                {page + 1}
              </button>
            );
          })}
          <button
            onClick={handleRightPagi}
            style={{
              background: `${"#d0ceee"}`,
              color: "#433EBE",
              fontSize: "18px",
            }}
            className="join-item btn">
            <IoIosArrowForward></IoIosArrowForward>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailableJobs;
