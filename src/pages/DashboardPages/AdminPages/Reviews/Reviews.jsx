import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { GoThumbsup } from "react-icons/go";
import { GrNext, GrPrevious } from "react-icons/gr";
import "./review.css";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useUserRole from "../../../../hooks/useUserRole";
import ReviewsSkeleton from "./ReviewsSkeleton";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();
  const [totalPages, setToalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = [...Array(totalPages).keys()];
  const [isUser] = useUserRole();

  const handlPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // fetch all reviews numbers
  const { data: reviewsNums, refetch: reFetchReviewsNums } = useQuery({
    queryKey: ["reviewsNumbers"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/feedbacks-nums`);
      setToalPages(Math.ceil(res.data?.total / 8));
      return res.data?.total;
    },
  });
  console.log("total review numbers are", reviewsNums);
  // fetch all reviews
  const { data: reviews, isFetching } = useQuery({
    queryKey: ["reviews", totalPages, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(`/feedbacks?skip=${currentPage * 6}`);
      return res.data;
    },
  });

  const [systems, setSystems] = useState({});
  if (isFetching) {
    return <ReviewsSkeleton></ReviewsSkeleton>;
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold font-inter">Reviews</h1>
        {isUser?.role === "employee" && (
          <Link to={"add-review"}>
            <a className="edit_btn">
              <IoAddCircleOutline className="text-2xl font-bold" />
              <span>Add Review</span>
            </a>
          </Link>
        )}
      </div>
      <div
        onClick={() => document.getElementById("my_modal_80").showModal()}
        className="min-h-[505px] cursor-pointer"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews?.map((item) => (
            <div
              className="border-2 rounded-lg p-3"
              key={item._id}
              onClick={() => setSystems(item)}
            >
              <div className="flex items-center gap-5">
                <img
                  className="h-12 w-12 rounded-full"
                  src={item.image}
                  alt=""
                />

                <div>
                  <h1 className="text-[20px] font-semibold">{item.name}</h1>
                  <p className="text-[#5B5555] text-[17px]">
                    {item.employeePosition}
                  </p>
                </div>
              </div>
              <p className="text-[#5B5555] font-medium mt-3">
                {item.description.length > 55 ? (
                  <span>{item.description.slice(0, 48)}...</span>
                ) : (
                  <span>{item.description}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* pagination */}
      <div className={`mt-10 ${reviewsNums > 6 ? "block" : "hidden"}`}>
        <div className={`flex justify-center`}>
          <div className={`join flex space-x-3`}>
            <button
              onClick={handlPrev}
              className={`join-item text-lg px-2 h-8 md:px-3 md:h-10 ${
                currentPage === 0
                  ? "text-[#ffffff] bg-[#d9d9db]"
                  : "bg-[#d0ceee] text-[#433EBE]"
              }`}
            >
              <IoIosArrowBack></IoIosArrowBack>
            </button>
            {pages?.map((page, index) => {
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
              onClick={handleNext}
              className={`join-item text-lg px-2 h-8 md:px-3 md:h-10 ${
                totalPages === currentPage + 1
                  ? "text-[#ffffff] bg-[#d9d9db]"
                  : "bg-[#d0ceee] text-[#433EBE]"
              }`}
            >
              <IoIosArrowForward></IoIosArrowForward>
            </button>
          </div>
        </div>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_80" className="modal">
        <div className="   modal-box  ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl">
              ✕
            </button>
          </form>

          <div>
            <img className="w-36 h-36 rounded-lg" src={systems?.image} alt="" />
            <div>
              <h1 className="text-[20px] font-bold">{systems?.name}</h1>
              <p className="text-[#5B5555] text-[14px]">
                {systems?.employeePosition}
              </p>
              <p className="pt-3">{systems?.description}</p>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Reviews;
