import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";
import { GrNext,GrPrevious } from "react-icons/gr";

const AddReview = () => {
  const totalReviews = 30;
  const [currentPage, setCurrentPage] = useState(0);
  const numOfPage = Math.ceil(totalReviews / 4);
  const pages = [...Array(numOfPage).keys()];
  console.log(pages);
  console.log(currentPage);

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


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
        <h1 className="text-3xl font-bold">Add Review</h1>
        <a className="flex gap-2 items-center text-[#F00] font-inter font-bold text-sm border-2 rounded-lg cursor-pointer border-[#F00] py-2 px-5 hover:bg-[#F00] hover:text-white transition-all duration-500">
          <MdOutlineCancel className="text-2xl" />
          <span>Cancel</span>
        </a>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <textarea
            {...register("review", { required: true })}
            rows={3}
            placeholder="Write your review here..."
            className="textarea focus:outline-none border-2 border-[#D9D9D9] rounded-lg"
          ></textarea>
          {errors.review && (
            <p className="text-[#F00]"> please provide a review</p>
          )}
        </div>
        <div className="mt-5">
          <a className="btn px-10 bg-primary text-white hover:text-black">
            Post
          </a>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
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
      <div className="text-cente flex flex-wrap justify-center md:space-x-3 mt-10 review-pagination">
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

export default AddReview;
