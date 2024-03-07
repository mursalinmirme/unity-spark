import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";

import SavedBlogCard from "./SavedBlogCard";
import SavedBlogSkeleton from "./SavedBlogSkeleton";

const SavedBlogs = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: SavedBlogs = [], isFetching , refetch} = useQuery({
    queryKey: ["saved_blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bookmarked-blogs/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h4 className="text-2xl mb-5 font-bold ">My Saved Blogs</h4>
      {isFetching ? (
        <SavedBlogSkeleton></SavedBlogSkeleton>
      ) : (
        // saved blogs part
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SavedBlogs &&
            SavedBlogs?.map((singleBlog) => (
              <SavedBlogCard
                key={singleBlog._id}
                singleBlog={singleBlog} refetch={refetch}></SavedBlogCard>
            ))}
        </div>
      )}
    </div>
  );
};

export default SavedBlogs;
