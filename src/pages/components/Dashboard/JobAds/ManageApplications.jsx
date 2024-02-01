import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { MdHideSource } from "react-icons/md";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const ManageApplications = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [totalPages, setToalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [applicationData, setApplicationData] = useState([]);
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

  const pagesArray = Array.from(
    { length: totalPages / 5 },
    (_, index) => index
  );
  const axiosPublic = useAxiosPublic();

  axiosPublic
    .get("/job_applications")
    .then((res) => {
      setApplicationData(res?.data);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className="py-10" id="manage_applications">
      <div className="min-h-[460px] space-y-3">
        {applicationData?.map((value) => (
          <div
            key={value._id}
            className="border-2 border-[#D9D9D9] rounded-xl px-2 md:px-5 py-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex  items-center gap-5">
                <img
                  src={value?.image}
                  alt="avatar"
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div>
                  <h1 className="font-semibold text-lg">{value?.title}</h1>
                  <h1 className="font-semibold text-[#5B5555]">
                    applied at {value?.createdAt}
                  </h1>
                </div>
              </div>
              <div className="relative md:hidden">
                <div
                  className="text-white bg-primary p-2 rounded-lg cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <HiDotsVertical />
                </div>
                <div
                  className={`absolute z-[3] right-6 w-12 bg-white text-white drop-shadow-lg rounded-lg p-2 ${
                    isDropdownOpen ? "block" : "hidden"
                  }`}
                >
                  <Link className="rounded-xl bg-[#433EBE]">
                    <div className="bg-primary w-8 h-7 mx-auto rounded-md flex items-center justify-center">
                      <IoEyeOutline className="text-md"></IoEyeOutline>
                    </div>
                  </Link>
                  <Link>
                    <div className="bg-primary w-8 h-7 mx-auto rounded-md flex items-center justify-center mt-2">
                      <IoCheckmark className="text-md"></IoCheckmark>
                    </div>
                  </Link>
                  <Link className="rounded-xl bg-[#433EBE]">
                    <div className="bg-primary w-8 h-7 mx-auto rounded-md flex items-center justify-center mt-2">
                      <RxCross1 className="text-md"></RxCross1>
                    </div>
                  </Link>
                </div>
              </div>
              <section className="space-x-3 justify-center items-center hidden md:flex text-white">
                <Link className="rounded-lg p-2 bg-[#433EBE]">
                  <IoEyeOutline className=""></IoEyeOutline>
                </Link>
                <Link className="rounded-lg p-2 bg-[#433EBE]">
                  <IoCheckmark className=""></IoCheckmark>
                </Link>
                <Link className="rounded-lg p-2 bg-[#433EBE]">
                  <RxCross1 className=""></RxCross1>
                </Link>
              </section>
            </div>
          </div>
        ))}
      </div>

      {/* pagination */}
      <div className="mt-10">
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

export default ManageApplications;
