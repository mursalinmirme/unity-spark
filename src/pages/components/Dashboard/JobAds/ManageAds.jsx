import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from 'sonner';
import { AiFillEdit } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { IoIosArrowBack, IoIosArrowForward, IoIosSearch } from "react-icons/io";
import { LuPenLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import ManageAdsSkeleton from "./ManageAdsSkeleton";

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
      return result.data.total;
    },
  });

  // make a array for get total pages
  const pagesArray = Array.from({ length: totalPages }, (_, index) => index);

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
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this job ad.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        PublicAxios.delete(`/job-ads/${id}`).then(() => {
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

  if (isFetching) {
    return <ManageAdsSkeleton></ManageAdsSkeleton>;
  }
  return (
    <div>
      <div className="mt-4 flex justify-between items-center">
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
                <div className="space-x-4 flex text-white">
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
      <div className={`${manageAds > 5 ? "block" : "hidden"} mt-5 mb-8 lg:mb-0`}>
        <div className={`flex justify-center`}>
          <div className={`join flex space-x-3`}>
            {
              console.log(totalPages, currentPage + 1)
            }
            <button
              onClick={handlePagiBack}
              className={`join-item text-lg px-2 h-8 md:px-3 md:h-10 ${currentPage === 0 ? 'text-[#ffffff] bg-[#d9d9db]':'bg-[#d0ceee] text-[#433EBE]'}`}
            >
              <IoIosArrowBack className="text-xl"></IoIosArrowBack>
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
    </div>
  );
};

export default ManageAds;
