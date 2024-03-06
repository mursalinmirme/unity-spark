import { Link } from "react-router-dom";
import moment from "moment";
import { LuPlusCircle } from "react-icons/lu";
import NewsLetterSubscribersSkeleton from "./NewsLetterSubscribersSkeleton";
import useNewsletterSubscriber from "../../../../hooks/useNewsletterSubscriber";

const NewsletterSubscribers = () => {
  const {subscribers, isFetching} = useNewsletterSubscriber()  
  
  if (isFetching) {
    return <NewsLetterSubscribersSkeleton></NewsLetterSubscribersSkeleton>;
  }
  
  return (
    <div>
      <div className="mb-5 flex flex-col md:flex-row md:justify-between md:items-center">
        <h3 className="text-2xl md:text-2xl font-semibold mb-3 md:mb-0">Our Newsletter Subscribers</h3>
        <Link to={"/dashboard/add-announcement"}>
          <p className="edit_btn">
            <LuPlusCircle className="text-lg"></LuPlusCircle>
            <span>Add Announcement</span>
          </p>
        </Link>
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
                  <img
                    className="w-12 h-12 rounded-full"
                    src={subscribe?.userInfo?.image}
                    alt=""
                  />
                </td>
                <td className="text-left">
                  {moment(subscribe?.createdAt).format("LL")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterSubscribers;
