import BlogsBanner from "./BlogsBanner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading/Loading";
import BlogCommonCard from "./BlogCommonCard";
import { useState } from "react";

const Blogs = () => {
  const { data, isPending } = useQuery({
    queryKey: ["all_blogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/blogs");
      return res.data;
    },
  });

  const [slicedBlog, setSlicedBlog] = useState(8);

  console.log(slicedBlog);

  return (
    <div className="blogs py-10">
      {isPending ? (
        <Loading></Loading>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:hidden lg:grid-cols-3 lg:grid gap-5">
            {data
              ?.map((blog) => (
                <BlogsBanner key={blog?._id} blog={blog}></BlogsBanner>
              ))
              .slice(0, 3)}
          </div>
          <div className="hidden md:grid lg:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data
              ?.map((blog) => (
                <BlogsBanner key={blog?._id} blog={blog}></BlogsBanner>
              ))
              .slice(0, 4)}
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-semibold">Explore All Blogs</h2>
            {data
              ?.map((blog) => (
                <BlogCommonCard key={blog._id} blog={blog}></BlogCommonCard>
              ))
              .slice(3, slicedBlog)}
          </div>

          {data.length > 8 && data.length >= slicedBlog ? (
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setSlicedBlog(slicedBlog + 5);
                }}
                className="nbtn">
                See More
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;
