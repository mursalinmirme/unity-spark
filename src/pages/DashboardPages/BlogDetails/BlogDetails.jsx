import moment from "moment";
import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  // get current page Blog info
  const { data: details } = useQuery({
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
  const { data: blogs, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/all-blogs`);
      return result.data;
    },
  });

  // console.log(blogs);
  const handlerComment = (e) => {
    e.preventDefault();
    const textareaValue = e.target.name.value;
    console.log(textareaValue);
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
          <img className="rounded-md w-full h-full" src={details?.image} alt="" />
          {/**Description  */}
          <div>
            <p className="mt-5">
              {details?.description && details?.description.slice(0, 307)}
            </p>
            <p className="my-5">
              {details?.description && details?.description.slice(308, 600)}
            </p>
            <p>
              {details?.description && details?.description.slice(608, 907)}
            </p>
            <p>
              {details?.description && details?.description.slice(908, 1500)}
            </p>
          </div>

          {/**freedBack Form */}
          <div className="mt-10">
            <form onSubmit={handlerComment}>
              <label>
                Give your Comment:
                <textarea
                  className="w-full h-28 border pl-2 mt-3 pt-2"
                  name="comment"
                  placeholder="Enter Your Comment..."
                />
              </label>
              <br />
              <button
                className="btn-sm bg-primary text-white mt-3 rounded-md"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
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
              className="card card-compact lg:w-96 bg-base-100 shadow-md "
            >
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
