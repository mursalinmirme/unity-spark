import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { GrNext,GrPrevious } from "react-icons/gr";
import './review.css'
import { Link } from "react-router-dom";

const Reviews = () => {
  const totalReviews = 30;
  const [currentPage, setCurrentPage] = useState(0);
  const numOfPage = Math.ceil(totalReviews / 6);
  const pages = [...Array(numOfPage).keys()];

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

  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axios.get("/reviews.json");
      return res.data;
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Reviews</h1>
        <Link to={'add-review'}>
        <a className="flex gap-2 items-center text-primary font-inter font-bold text-sm border-2 rounded-lg cursor-pointer border-primary py-2 px-5 hover:bg-primary hover:text-white transition-all duration-500">
          <AiOutlineLike className="text-2xl" />
          <span>Add Review</span>
        </a>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews?.map((item) => (
          <div className="border-2 rounded-lg p-3" key={item.id}>
            <div className="flex items-center gap-5">
              <img className="h-16 w-16 " src={item.image} alt="" />
              <div>
                <h1 className="text-xl font-bold">{item.name}</h1>
                <p className="text-[#5B5555] font-semibold">{item.title}</p>
              </div>
            </div>
            <p className="text-[#5B5555] font-medium">
              "
              {item.review.length > 60 ? (
                <span>{item.review.slice(0, 60)}...</span>
              ) : (
                <span>{item.review}</span>
              )}
              "
            </p>
          </div>
        ))}
      </div>
      <div className="text-cente flex flex-wrap justify-center md:space-x-3 mt-20 review-pagination">
        <a onClick={handlPrev}>
          <GrPrevious className="icons" />
        </a>
        {pages.map((i) => (
          <a
            onClick={() => setCurrentPage(i)}
            className={`${currentPage === i && "pagination-active"}`}
            key={i}
          >
            {i}
          </a>
        ))}
        <a onClick={handleNext} className="">
         <GrNext className="icons"/>
        </a>
      </div>
    </div>
  );
};

export default Reviews;
