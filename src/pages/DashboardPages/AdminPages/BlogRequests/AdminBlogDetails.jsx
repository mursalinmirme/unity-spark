import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import moment from "moment";
import parse from 'html-react-parser';
const AdminBlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { data: reqBlogDetails = {} } = useQuery({
    queryKey: ["reqBlogDetails"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/blogs/${id}`);
      return result.data;
    },
  });
  console.log("request blog details is", reqBlogDetails);
  return (
    <div>
      <h4 className="text-center  font-semibold text-2xl border-b-2 pb-3 ">Preview Blog Post</h4>
      <div className="mt-4 flex flex-col md:flex-row justify-between md:items-center">
        <div className="flex items-center gap-3">
        <img
          className="rounded-full w-12 md:w-14 h-12 md:h-14"
          src={reqBlogDetails?.bloggerInfo?.image}
          alt=""
        />
        <div>
          <p className="text-lg font-semibold">
            {reqBlogDetails?.bloggerInfo?.name}
          </p>
          <p className="text-base font-medium">
            {reqBlogDetails?.bloggerInfo?.position}
          </p>
        </div>
        </div>
        <p className="text-lg md:font-semibold mt-3 md:mt-0">Posted: {moment(reqBlogDetails?.createdAt).startOf('day').fromNow()}</p>
      </div>
      <div>
        <h3 className="text-2xl md:text-3xl font-semibold mt-4 leading-snug">
          {reqBlogDetails?.title}
        </h3>
      </div>
      <div>
        <img
          className="w-full mt-4 md:h-[500px]"
          src={reqBlogDetails?.image}
          alt=""
        />
      </div>
      <div className="text-lg pt-3">
        {reqBlogDetails?.description && parse(reqBlogDetails?.description)}
      </div>
      <div className="flex gap-5 pt-3">
        <button className="border bg-accent text-white px-5 py-2.5 rounded-md font-medium">Accept Blog</button>
        <button className="border bg-red-600 text-white px-5 py-2.5 rounded-md font-medium">Reject Blog</button>
      </div>
    </div>
  );
};

export default AdminBlogDetails;
