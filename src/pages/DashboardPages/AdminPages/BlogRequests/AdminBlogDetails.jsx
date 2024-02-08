import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import moment from "moment";

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
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
        <img
          className="rounded-full w-14 h-14"
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
        <p className="text-lg font-semibold">Posted: {moment(reqBlogDetails?.createdAt).startOf('day').fromNow()}</p>
      </div>
      <div>
        <h3 className="text-3xl font-semibold mt-4 leading-snug">
          {reqBlogDetails?.title}
        </h3>
      </div>
      <div>
        <img
          className="w-full mt-4 h-[500px]"
          src={reqBlogDetails?.image}
          alt=""
        />
      </div>
      <div className="text-lg pt-3">
        <p className="mt-5">
          {reqBlogDetails?.description &&
            reqBlogDetails?.description.slice(0, 307)}
        </p>
        <p className="my-5">
          {reqBlogDetails?.description &&
            reqBlogDetails?.description.slice(308, 600)}
        </p>
        <p className="my-5">
          {reqBlogDetails?.description &&
            reqBlogDetails?.description.slice(608, 907)}
        </p>
        <p className="my-5">
          {reqBlogDetails?.description &&
            reqBlogDetails?.description.slice(908, 1500)}
        </p>
      </div>
      <div className="flex gap-5 pt-3">
        <button className="border bg-accent text-white px-5 py-2.5 rounded-md font-medium">Accept Blog</button>
        <button className="border bg-red-600 text-white px-5 py-2.5 rounded-md font-medium">Reject Blog</button>
      </div>
    </div>
  );
};

export default AdminBlogDetails;
