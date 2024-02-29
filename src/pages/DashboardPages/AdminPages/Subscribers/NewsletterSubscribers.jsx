import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import moment from "moment";
import { LuPlusCircle } from "react-icons/lu";
import NewsLetterSubscribersSkeleton from "./NewsLetterSubscribersSkeleton";
const NewsletterSubscribers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: subscribers, isFetching } = useQuery({
    queryKey: ["getSubscribers"],
    queryFn: async () => {
      const result = await axiosSecure.get("/subscribers");
      return result.data;
    },
  });
  console.log("Our total subscribers", subscribers);
  if(isFetching){
    return <NewsLetterSubscribersSkeleton></NewsLetterSubscribersSkeleton>
  }
  return (
    <div>
      <div className="mb-5 flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Our Newsletter Subscribers</h3>
        <Link to={"/dashboard/add-announcement"}><p className="border-2 px-4 py-2 border-primary text-primary rounded-lg font-semibold flex items-center gap-1"><LuPlusCircle className="text-lg"></LuPlusCircle><span>Add Announcement</span></p></Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table border">
          {/* head */}
          <thead className="bg-primary">
            <tr className="text-white text-base">
              <th>SL.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Profile</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {subscribers?.map((subscribe, indx) => (
              <tr key={subscribe?._id} className="text-base">
                <th>{indx + 1}</th>
                <td className="text-left">{subscribe?.userInfo?.name}</td>
                <td className="text-left">{subscribe?.userInfo?.email}</td>
                <td className="text-left">
                  <img className="w-14 h-14 rounded-full" src={subscribe?.userInfo?.image} alt="" />
                </td>
                <td className="text-left">{moment(subscribe?.createdAt).format('LL')}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterSubscribers;
