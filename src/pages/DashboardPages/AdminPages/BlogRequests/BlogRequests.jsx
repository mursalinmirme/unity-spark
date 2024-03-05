import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import BlogRequestsRow from "./BlogRequestsRow";

const BlogRequests = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: blogRequests = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["blogRequests"],
    queryFn: async () => {
      const result = await axiosPublic.get("/pendingBlogs");
      return result?.data;
    },
  });

  return (
    <div>
      {blogRequests?.length === 0 ? (
        <div className="md:mt-10 font-inter text-lg font-bold flex justify-center ">
          <p>No new blog requests at the moment</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <h3 className="text-2xl font-semibold">New Blog Requests</h3>
          <table className=" table mt-10">
            {/* head */}
            <thead className=" text-black text-[18px] rounded-md text-center">
              <tr className="text-left">
                <th className="text-left">Serial</th>
                <th>Title</th>
                <th className="text-left">Blogger</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogRequests &&
                blogRequests?.map((blogRequest, idx) => (
                  <BlogRequestsRow
                    blogRequest={blogRequest}
                    key={blogRequest._id}
                    idx={idx}
                    isFetching={isFetching}
                    refetch={refetch}></BlogRequestsRow>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlogRequests;
