import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { GoThumbsup } from "react-icons/go";
import { GrNext, GrPrevious } from "react-icons/gr";
import "./review.css";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useUserRole from "../../../../hooks/useUserRole";

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
  const { data: reviewsNums, refetch:reFetchReviewsNums } = useQuery({
    queryKey: ["reviewsNumbers"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/feedbacks-nums`);
      setToalPages(Math.ceil(res.data?.total / 8));
      return res.data?.total;
    },
  });
  console.log("total review numbers are", reviewsNums);
  // fetch all reviews
  const { data: reviews, refetch } = useQuery({
    queryKey: ["reviews", totalPages, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(`/feedbacks?skip=${currentPage * 6}`);
      return res.data;
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl md:text-3xl font-bold">Reviews</h1>
        {isUser?.role === "employee" && (
          <Link to={"add-review"}>
            <a className="edit_btn text-primary border-primary hover:bg-primary hover:text-white">
              <AiOutlineLike className="text-xl" />
              <span>Add Review</span>
            </a>
          </Link>
        )}
      </div>
      <div className="min-h-[505px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews?.map((item) => (
          <div className="border-2 rounded-lg p-3" key={item._id}>
            <div className="flex items-center gap-5">
              <img className="h-12 w-12 rounded-full" src={item.image} alt="" />
              <div>
                <h1 className="text-[20px] font-bold">{item.name}</h1>
                <p className="text-[#5B5555] text-[14px]">
                  {item.employeePosition}
                </p>
              </div>
            </div>
            <p className="text-[#5B5555] font-medium mt-3">
              {item.description.length > 55 ? (
                <span>
                  {" "}
                  {'"'}
                  {item.description.slice(0, 55)}...{'"'}
                </span>
              ) : (
                <span>
                  {" "}
                  {'"'}
                  {item.description}
                  {'"'}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
      </div>
      <div className="text-cente flex flex-wrap justify-center space-x-2 md:space-x-3 mt-10 review-pagination">
        <a onClick={handlPrev}>
          <GrPrevious className="icons" />
        </a>
        {pages.map((i) => (
          <a
            onClick={() => setCurrentPage(i)}
            className={`${currentPage === i && "pagination-active"}`}
            key={i}
          >
            {i + 1}
          </a>
        ))}
        <a onClick={handleNext} className="">
          <GrNext className="icons" />
        </a>
      </div>
    </div>
  );
};

export default Reviews;
