import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Loading from "../../../components/Loading/Loading";
import SavedBlogCard from "./SavedBlogCard";

const SavedBlogs = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: SavedBlogs = [], isLoading } = useQuery({
    queryKey: ["saved_blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bookmarked-blogs/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SavedBlogs &&
            SavedBlogs?.map((singleBlog) => (
              <SavedBlogCard
                key={singleBlog._id}
                singleBlog={singleBlog}></SavedBlogCard>
            ))}
        </div>
      )}
    </div>
  );
};

export default SavedBlogs;
