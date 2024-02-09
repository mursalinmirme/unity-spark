import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import BlogRequestsRow from "./BlogRequestsRow";

const BlogRequests = () => {
  const axiosPublic = useAxiosPublic();

  const { data: blogRequests = [], refetch } = useQuery({
    queryKey: ["blogRequests"],
    queryFn: async () => {
      const result = await axiosPublic.get("/pendingBlogs");
      return result?.data;
    },
  });

  console.log('get blog requests',blogRequests);

  return (
    <div>
      <div className="overflow-x-auto">
        <h3 className="text-3xl font-semibold">All our users</h3>
        <table className=" table mt-10">
          {/* head */}
          <thead className=" text-black text-[18px] rounded-md text-center">
            <tr className="text-center">
              <th>Serial</th>
              <th>Title</th>
              <th>Blogger</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogRequests &&
              blogRequests?.map((blogRequest, idx) => (
                <BlogRequestsRow
                  blogRequest={blogRequest}
                  key={blogRequest._id}
                  idx={idx}
                  refetch={refetch}></BlogRequestsRow>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogRequests;
