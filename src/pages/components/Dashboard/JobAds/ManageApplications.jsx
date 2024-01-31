import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { MdHideSource } from "react-icons/md";
const ManageApplications = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [totalPages, setToalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
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

  return (
    <div className="py-10">
      <div className="min-h-[460px]">
        <div className="border-2 border-[#D9D9D9] rounded-xl px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <img
                src="https://i.ibb.co/x2WP2jQ/73886110a00aca5829ed3e9b6ca8b3e3.png"
                alt="avatar"
                className="w-[50px] h-[50px] rounded-full"
              />
              <div>
                <h1 className="font-semibold text-lg">Web Developer</h1>
                <h1 className="font-semibold text-[#5B5555]">
                  applied 8min ago
                </h1>
              </div>
            </div>
            {/* test */}
            <section className="space-x-3 flex justify-center items-center text-lg text-white">
              <Link className="rounded-md p-2 bg-[#433EBE] flex items-center justify-center">
                <IoEyeOutline></IoEyeOutline>
              </Link>
              <Link className="rounded-md p-2 bg-[#433EBE] flex items-center justify-center">
                <IoCheckmark></IoCheckmark>
              </Link>
              <Link className="rounded-md p-2 bg-[#433EBE] flex items-center justify-center">
                <RxCross1></RxCross1>
              </Link>
            </section>
            {/* <div>
              <ul className="menu menu-horizontal">
                <li>
                  <details className="text-lg text-white">
                    <summary>
                      <Link className="rounded-md p-2 bg-[#433EBE]">
                        <CiMenuKebab className=""></CiMenuKebab>
                      </Link>
                    </summary>
                    <ul>
                      <li>
                        <Link className="rounded-md p-2 bg-[#433EBE] flex justify-center">
                          <IoEyeOutline></IoEyeOutline>
                        </Link>
                      </li>
                      <li>
                        <Link className="rounded-md p-2 bg-[#433EBE] flex justify-center">
                          <IoCheckmark className="text-lg"></IoCheckmark>
                        </Link>
                      </li>
                      <li>
                        <Link className="rounded-md p-2 bg-[#433EBE] flex justify-center">
                          <RxCross1 className="text-lg"></RxCross1>
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div> */}
            {/* test */}
          </div>
        </div>
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
