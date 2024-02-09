import { Link } from "react-router-dom";
import moment from "moment";

const BlogsBanner = ({ blog }) => {
  const { title, _id, createdAt, image } = blog || {};
  const today = new Date();
  const secondsDiff = moment(today).diff(moment(createdAt), "seconds");
  const formattedDiff = moment.duration(secondsDiff, "seconds").humanize();

  const bannerBlogStyle = {
    background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`,
    backgroundSize: "cover",
  };

  return (
    <Link to={`/blog-details/${_id}`}>
      <div
        style={bannerBlogStyle}
        className="h-[400px] rounded-xl flex flex-col gap-3 justify-end p-5"
      >
        <h5 className="text-gray-300">posted {formattedDiff} ago</h5>
        <h2 className="text-white text-2xl font-medium font-inter">{title}</h2>
      </div>
    </Link>
  );
};

export default BlogsBanner;
