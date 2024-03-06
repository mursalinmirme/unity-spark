import moment from "moment";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import useUserInfo from "../../../hooks/useUserInfo";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import BlogComments from "./BlogComments";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [isLiked, setIsLiked] = useState(null);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  const [users] = useUserInfo();

  const { user } = useContext(AuthContext);

  // get current page Blog info
  const { data: details = {} } = useQuery({
    queryKey: ["blogDetails", id],
    queryFn: async () => {
      const result = await axiosPublic.get(`/blog-details/${id}`);
      return result.data;
    },
  });

  const timestamp = details?.createdAt;
  const timeDifference = moment(timestamp).fromNow();

  const { data: blogs } = useQuery({
    queryKey: ["blogs", id],
    queryFn: async () => {
      const result = await axiosPublic.get(`/top-blogs/${id}`);
      return result.data;
    },
  });

  const { data: checkLiked } = useQuery({
    queryKey: ["checkLiked", id],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosPublic.get(
        `/check-like?email=${user?.email}&blogId=${id}`
      );
      setIsLiked(result?.data?.isLiked);
      return result.data;
    },
  });

  const { data: comments = [], refetch } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/comments/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const { data: countComments, refetch: fetchComment } = useQuery({
    queryKey: ["countComments", id],
    queryFn: async () => {
      const result = await axiosPublic.get(`/count-comments/${id}`);
      setTotalComments(result?.data?.totalComments);
      return result.data;
    },
  });

  const handleCommentSubmit = (data) => {
    const newComment = {
      commentTxt: data?.comment,
      blogId: id,
      commenterInfo: users?._id,
    };

    axiosPublic
      .post("/comments", newComment)
      .then(() => {
        refetch();
        fetchComment();
        reset();
        toast.success("Comment Added");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const { data: countLikes, refetch: fetchLike } = useQuery({
    queryKey: ["countLikes", id],
    queryFn: async () => {
      const result = await axiosPublic.get(`/count-likes/${id}`);
      setTotalLikes(result?.data?.totalLikes);
      return result.data;
    },
  });

  const likeHandler = async () => {
    await axiosPublic
      .post("/toggleLike", {
        email: users?.email,
        blogId: id,
      })
      .then((res) => {
        setIsLiked(res?.data?.isLiked);
        fetchLike();
      });
  };

  const scrollToCommentSection = () => {
    const commentSection = document.getElementById("commentSection");
    commentSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleBlogSave = () => {
    axiosPublic
      .post("/bookmarked-blogs", { email: user?.email, blogInfo: id })
      .then((res) => {
        if (res.data === "exists") {
          return toast.error("Blog Saved Already");
        }
        toast.success("Successfully Saved");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex lg:flex-row flex-col justify-between gap-5 my-5 max-w-[92%] lg:max-w-[1200px] mx-auto">
      {/** Left Side  */}
      <div className="w-full p-2 flex-wrap lg:overflow-y-auto lg:max-h-[100vh] lg:pr-6">
        <h1 className="text-2xl font-bold font-inter"> {details?.title} </h1>
        {/**Author Info */}
        <div className="flex justify-between items-center mt-5">
          <div className="flex justify-between gap-4 items-center">
            <div>
              <img
                className="w-10 h-10 rounded-full border border-black"
                src={details?.bloggerInfo?.image}
                alt=""
              />
            </div>
            <div>
              <p className="text-[18px] font-inter font-semibold">
                {details?.bloggerInfo?.name}
              </p>
              <p className="text-[13px] font-inter font-semibold">
                {details?.bloggerInfo?.position}
              </p>
            </div>
          </div>
          <div className="text-[14px] font-inter font-semibold">
            {timeDifference}
          </div>
        </div>

        <div className="border-2 my-4 p-3 border-s-0 border-e-0 flex justify-between">
          <div className="flex gap-8 text-xl">
            <div className="flex items-center gap-2">
              {user?.email ? (
                <button onClick={likeHandler}>
                  {isLiked ? <AiFillLike /> : <AiOutlineLike />}
                </button>
              ) : (
                <button>
                  <Link to="/signin">
                    <AiOutlineLike />
                  </Link>
                </button>
              )}
              <p>{totalLikes}</p>
            </div>
            <div className="flex gap-2 items-center">
              {user?.email ? (
                <button onClick={scrollToCommentSection}>
                  <FaRegComments></FaRegComments>
                </button>
              ) : (
                <button>
                  <Link to="/signin">
                    <FaRegComments></FaRegComments>
                  </Link>
                </button>
              )}

              <p>{totalComments}</p>
            </div>
          </div>

          <div className="text-xl">
            {user?.email ? (
              <button onClick={handleBlogSave}>
                <CiBookmark></CiBookmark>
              </button>
            ) : (
              <Link to="/signin">
                <CiBookmark></CiBookmark>
              </Link>
            )}
          </div>
        </div>
        {/**Blog Image */}
        <div className="mt-5">
          <img
            className="rounded-md w-full h-full"
            src={details?.image}
            alt=""
          />
          {/**Description  */}
          <div className="text-lg mt-8 text-justify">
            {details?.description && parse(details?.description)}
          </div>

          {/**freedBack Form */}
          <div className="mt-10" id="commentSection">
            <form onSubmit={handleSubmit(handleCommentSubmit)}>
              <label>
                Give your Comment:
                <textarea
                  {...register("comment")}
                  className="w-full h-28 border pl-2 mt-3 pt-2"
                  placeholder="Enter Your Comment..."
                />
              </label>
              <br />
              <button
                className="btn-sm bg-primary text-white mt-3 rounded-md"
                type="submit"
              >
                Comment
              </button>
            </form>
          </div>

          {comments && comments?.length > 0 ? (
            <div className="mt-10">
              <h3 className="font-inter font-semibold text-xl">Comments...</h3>
              {comments?.map((comment) => (
                <BlogComments
                  key={comment?._id}
                  comment={comment}
                ></BlogComments>
              ))}
            </div>
          ) : (
            <div className="mt-10">
              <p>No comments yet</p>
            </div>
          )}
        </div>
      </div>

      {/** Right Side  */}
      <div className="w-full flex-1 p-2">
        <h1 className="text-2xl font-bold font-inter">Find Out More...</h1>
        {/* blogs map */}
        <div className="flex flex-col gap-6 mt-6">
          {blogs?.map((blog) => (
            <div
              key={blog._id}
              className="card card-compact lg:w-96 bg-base-100 border-2"
            >
              <figure>
                <img src={blog?.image} alt="Shoes" />
              </figure>

              <div className="p-4 pt-0">
                <h2 className="text-lg font-inter  font-bold mt-4">
                  {" "}
                  {blog?.title}
                </h2>
                <p className="pt-1">
                  {blog?.description
                    ? blog?.description.slice(0, 70) + "..."
                    : blog?.description}
                </p>
                <div className="card-actions justify-start py-1">
                  <Link to={`/blog-details/${blog?._id}`}>
                    <div className="nbtn mt-2">Read More</div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          {" "}
          <Link to="/blog">
            {" "}
            <button className="px-10 py-2 rounded-lg nbtn text-white">
              {" "}
              See More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
