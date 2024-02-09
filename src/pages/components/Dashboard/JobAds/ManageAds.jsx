import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuPenLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loading from "../../Loading/Loading";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const ManageAds = () => {
  const PublicAxios = useAxiosPublic();
  const [totalPages, setToalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValues, setSearchValues] = useState(null);

  const { data: manageAds = 0 } = useQuery({
    queryKey: ["manageOurAds", currentPage, searchValues],
    queryFn: async () => {
      const result = await PublicAxios.get(
        `/total-job-ads-numbers?searchVal=${searchValues}`
      );
      setToalPages(Math.ceil(result?.data.total / 6));
      // console.log("The jobs document count is", result.data.total);
      return result.data.total;
    },
  });
  // console.log('Rw skdjfkdjf', manageAds);

  const pagesArray = Array.from({ length: totalPages }, (_, index) => index);

  // console.log(pagesArray);

  // fetch all the jobs list from database one by one
  const {
    data: ourAllJobs = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["seeOurAllJobs", currentPage, searchValues],
    queryFn: async () => {
      const result = await PublicAxios.get(
        `/total-job-ads?skip=${currentPage * 6}&searchVal=${searchValues}`
      );
      return result.data;
    },
  });

  // handle delete job ads
  const handleDeleteJob = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        PublicAxios.delete(`/job-ads/${id}`).then((res) => {
          console.log(res.data);
          toast.success("Successfully deleted");
          refetch();
        });
      }
    });
  };

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
    const form = e.target;
    const searchVal = form.search.value;
    if (!searchVal) {
      return;
    }
    setSearchValues(searchVal);
  };
  //  HANDLE SHOW SEARCH BAR
  const handleShowSearchBar = () => {
    setShowSearchBar(true);
    setSearchValues(null);
  };
  // handle close search bar
  const handleCloseSearchBar = () => {
    setShowSearchBar(false);
    setSearchValues(null);
  };
  // if(isFetching){
  //   return <Loading></Loading>
  // }
  return (
    <div>
      <div className="mt-4 flex justify-between items-center">
        {/* <div className="flex items-center gap-3">
          <form
            onSubmit={handleSearches}
            className={`p-0 border-0 m-0 relative ${
              showSearchBar ? "hidden" : "visible"
            }`}
          >
            <input
              name="search"
              className="md:py-1 pl-14 m-0 md:w-60 lg:w-80 border-second"
              type="text"
              placeholder="Search..."
            />
            <button
              style={{ background: "#433EBE" }}
              className="absolute top-0 left-0 rounded-none rounded-s-lg h-full px-4"
            >
              <IoIosSearch className="text-xl text-white"></IoIosSearch>
            </button>
          </form>
          {showSearchBar ? (
            <button
              onClick={() => setShowSearchBar(false)}
              className="rounded-md bg-primary text-white p-2 px-4"
            >
              <IoIosSearch className="text-lg"></IoIosSearch>
            </button>
          ) : (
            <button
              onClick={handleCloseSearchBar}
              className="rounded-none bg-none text-primary left-0"
            >
              <ImCross className="text-lg"></ImCross>
            </button>
          )}
        </div> */}
        <div className="flex gap-2">
          <form
            onSubmit={handleSearches}
            className={`p-0 border-0 m-0 search-box ${
              showSearchBar && "active-search-dashboard"
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
                onClick={handleShowSearchBar}
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

        <div>
          <Link to="/dashboard/addJobs">
            <p className="edit_btn">
              <LuPenLine></LuPenLine> <span>New Ad</span>
            </p>
          </Link>
        </div>
      </div>
      {/* main cards */}
      {ourAllJobs.length > 0 ? (
        <div className="min-h-[62vh]">
          {ourAllJobs?.map((job) => {
            return (
              <div
                className="border-2 p-3 my-4 rounded-lg flex justify-between items-center"
                key={job?._id}
              >
                <div>
                  <h3 className="text-md font-bold">
                    {job?.job_title} -{" "}
                    <span className="text-slate-500 font-medium ">
                      {" "}
                      {job?.job_category1}
                    </span>
                  </h3>
                </div>
                <div className="space-x-4 text-white">
                  <Link to={`/dashboard/jobs/jobs-edit/${job?._id}`}>
                    <button className="bg-primary rounded-lg p-2">
                      <AiFillEdit className="text-lg"></AiFillEdit>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteJob(job?._id)}
                    className="bg-[#DD3333] rounded-lg p-2 "
                  >
                    <RiDeleteBin6Line className="text-lg"></RiDeleteBin6Line>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[400px]">
          <h3 className="text-lg font-medium text-primary">
            There has no job ads to your search.
          </h3>
        </div>
      )}

      {/* pagination */}
      <div className={`${manageAds > 5 ? "block" : "hidden"}`}>
        <div className={`flex justify-center`}>
          <div className={`join flex space-x-2`}>
            <button
              onClick={handlePagiBack}
              style={{
                background: `${"#d0ceee"}`,
                color: "#433EBE",
                fontSize: "18px",
              }}
              className="join-item btn"
            >
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
                  className="join-item btn"
                >
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
              className="join-item btn"
            >
              <IoIosArrowForward></IoIosArrowForward>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAds;
