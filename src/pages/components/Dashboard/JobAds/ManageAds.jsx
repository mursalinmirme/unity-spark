import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuPenLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const ManageAds = () => {
  const [totalPages, setToalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(true);

  const { data: manageAds = [] } = useQuery({
    queryKey: ["manageOurAds"],
    queryFn: async () => {
      const result = await axios.get(
        "http://localhost:5000/total-job-ads-numbers"
      );
      setToalPages(result.data.total / 5);
      console.log("The jobs document count is", result.data.total);
      return result.data.total;
    },
  });

  const pagesArray = Array.from({ length: totalPages }, (_, index) => index);

  console.log(pagesArray);

  // fetch all the jobs list from database one by one
  const { data: ourAllJobs = [] } = useQuery({
    queryKey: ["seeOurAllJobs", currentPage],
    queryFn: async () => {
      const result = await axios.get(
        `http://localhost:5000/total-job-ads?skip=${currentPage * 5}`
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
  // handle search system
  const handleSearches = (e) => {
    e.preventDefault();
    alert("Search button is working");
  };
  // handle close search bar
  const handleCloseSearchBar = () => {
    setShowSearchBar(true);
  };

  return (
    <div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex">
          <form
            onSubmit={handleSearches}
            className={`p-0 border-0 m-0 relative ${
              showSearchBar ? "hidden" : "visible"
            }`}>
            <input
              name="search"
              className="md:py-2 pl-14 m-0 md:w-60 lg:w-80 border-second"
              type="text"
              placeholder="Search..."
            />
            <button className="absolute top-0 left-0 h-full rounded-none rounded-s-lg bg-primary text-white px-3">
              <FaSearch className="text-lg"></FaSearch>
            </button>
          </form>
          {showSearchBar ? (
            <button
              onClick={() => setShowSearchBar(false)}
<<<<<<< HEAD
              className="rounded-md bg-primary text-white p-2"
            >
=======
              className="rounded-md md:h-[40.2px]">
>>>>>>> 44d34573d3642e6e4b94a3ced2c1aeb94675aef9
              <FaSearch className="text-lg"></FaSearch>
            </button>
          ) : (
            <button
              onClick={handleCloseSearchBar}
              className="rounded-none bg-none text-primary left-0">
              <ImCross className="text-lg"></ImCross>
            </button>
          )}
        </div>

        <div>
          <Link to="/dashboard/addJobs">
            <p className="flex items-center gap-2 text-[#433ebe] font-inter font-semibold border-[2px] border-[#433ebe] p-2 rounded-lg">
              <LuPenLine></LuPenLine> <span>New Ad</span>
            </p>
          </Link>
        </div>
      </div>
      {/* main cards */}
      <div className="pt-3">
        {ourAllJobs?.map((job) => {
          return (
            <div
              className="border-2 p-3 my-4 rounded-lg flex justify-between items-center"
              key={job?._id}>
              <div>
                <h3 className="text-lg font-semibold">
                  {job?.job_title} - {job?.job_category2} - {job?.job_category1}
                </h3>
                <h6>
                  <strong>Posted:</strong>{" "}
                  {moment(job?.createdAt).startOf("day").fromNow()}
                </h6>
              </div>
              <div className="space-x-4">
                <button className="bg-primary rounded-md px-2.5">
                  <AiFillEdit className="text-xl"></AiFillEdit>
                </button>
                <button className="bg-primary rounded-md px-2.5">
                  <RiDeleteBin6Line className="text-xl"></RiDeleteBin6Line>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* pagination */}
      <div>
        <div className={`flex justify-center`}>
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
                    background: `${
                      currentPage == page ? "#433EBE" : "#d0ceee"
                    }`,
                    color: `${currentPage == page ? "#FFFFFF" : "#433EBE"}`,
                    borderRadius: "5px",
                    fontSize: "18px",
                  }}
                  className="join-item btn">
                  {page}
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
    </div>
  );
};

export default ManageAds;
