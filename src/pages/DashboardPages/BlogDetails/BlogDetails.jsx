import moment from "moment";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import useUserInfo from "../../../hooks/useUserInfo";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import BlogComments from "./BlogComments";

const BlogDetails = () => {
  const { id } = useParams();
  // const { detailsId, setDetailsId } = useState(id);
  // console.log("check33", detailsId);
  const axiosPublic = useAxiosPublic();

  const [users] = useUserInfo();

  // get current page Blog info
  const { data: details = {} } = useQuery({
    queryKey: ["blogDetails"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/blog-details/${id}`);
      return result.data;
    },
  });

  // console.log("check", details);
  const timestamp = details?.createdAt;
  const timeDifference = moment(timestamp).fromNow();

  // get current page job info
  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const result = await axiosPublic.get("/all-blogs");
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

  const { register, handleSubmit } = useForm();

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
        toast.success("Comment Added");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex lg:flex-row flex-col justify-between gap-5 my-5">
      {/** Left Side  */}
      <div className="w-full  p-2 flex-wrap">
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
              <p className="text-[14px] font-inter font-semibold">
                {details?.bloggerInfo?.name}
              </p>
              <p className="text-[14px] font-inter font-semibold">
                {details?.bloggerInfo?.position}
              </p>
            </div>
          </div>
          <div className="text-[14px] font-inter font-semibold">
            {timeDifference}
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
          <div className="mt-10">
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
                type="submit">
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
                  comment={comment}></BlogComments>
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
      <div className="w-full  flex-1 p-2">
        <h1 className="text-2xl font-bold font-inter">Find Out More...</h1>
        {/* blogs map */}
        <div className="flex flex-col gap-6 mt-6">
          {blogs?.map((blog) => (
            <div
              key={blog._id}
              className="card card-compact lg:w-96 bg-base-100 shadow-md ">
              <figure>
                <img src={blog?.image} alt="Shoes" />
              </figure>
              <p className="pt-2 text-[14px] font-inter pl-4">
                {" "}
                Post : {blogs?.length} demo
              </p>
              <div className="p-4 pt-0">
                <h2 className="text-[16px] font-inter font-bold">
                  {" "}
                  {blog?.title}
                </h2>
                <p className="pt-1">
                  {blog?.description
                    ? blog?.description.slice(0, 70) + "..."
                    : blog?.description}
                </p>
                <div className="card-actions justify-start py-1">
                  <Link>
                    <div className="btn btn-sm btn-primary">Read More</div>
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
            <button className="px-10 py-2 rounded-lg bg-primary text-white">
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
