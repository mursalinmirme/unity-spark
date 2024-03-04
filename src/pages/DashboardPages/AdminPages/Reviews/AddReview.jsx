import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { toast } from "sonner";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUserInfo from "../../../../hooks/useUserInfo";

const AddReview = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const totalReviews = 30;
  const [currentPage, setCurrentPage] = useState(0);
  const numOfPage = Math.ceil(totalReviews / 4);
  const pages = [...Array(numOfPage).keys()];
  const [users] = useUserInfo();
  console.log(users);

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

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res?.data;
    },
  });

  const { data: reviews, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedbacks");
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userReview = {
      name: userInfo.name,
      image: userInfo.image,
      employeePosition: users?.position ? users?.position : "guest",
      description: data.review,
    };
    console.log(userReview);
    axiosPublic.post("/feedbacks", userReview).then((res) => {
      console.log(res);
      toast.success("Review successfully posted");
      reset();
      refetch();
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Add Review</h1>
        <Link to={"/dashboard/reviews"}>
          <a className="edit_btn !text-red-500 hover:!text-white !border-red-600 hover:!border-red-600 hover:!bg-red-600">
            <MdOutlineCancel className="text-lg" />
            <span>Cancel</span>
          </a>
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <textarea
            {...register("review", { required: true })}
            rows={3}
            placeholder="Write your review here..."
            className="textarea focus:outline-none border-[1.5px] border-[#D9D9D9] rounded-lg text-base"
          ></textarea>
          {errors.review && (
            <p className="text-[#F00]"> please provide a review</p>
          )}
        </div>
        <div className="mt-4">
          <input className="nbtn-fixed-bg w-20" type="submit" value="Post" />
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {reviews?.map((item) => (
          <div className="border-2 rounded-lg p-3" key={item.id}>
            <div className="flex items-center gap-5">
              <img className="h-12 w-12 rounded-full" src={item.image} alt="" />
              <div>
                <h1 className="text-xl font-bold">{item.name}</h1>
                <p className="text-[#5B5555] font-semibold">
                  {item.employeePosition}
                </p>
              </div>
            </div>
            <p className="text-[#5B5555] font-medium mt-3">
             
              {item.description.length > 55 ? (
                <span>{item.description.slice(0, 55)}...</span>
              ) : (
                <span>{item.description}</span>
              )}
            
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
          <GrNext className="icons" />
        </a>
      </div>
    </div>
  );
};

export default AddReview;
