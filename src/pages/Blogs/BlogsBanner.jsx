import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";

const BlogsBanner = ({ blog }) => {
  const { title, _id, createdAt, image } = blog || {};
  const today = new Date();
  const secondsDiff = moment(today).diff(moment(createdAt), "seconds");
  const formattedDiff = moment.duration(secondsDiff, "seconds").humanize();

  const bannerBlogStyle = {
    background: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0)), url(${image})`,
    backgroundSize: "cover",
  };

  return (
    <Link to={`/blog-details/${_id}`}>
      <div
        style={bannerBlogStyle}
        className="h-[400px] rounded-xl flex flex-col gap-3 justify-end p-5"
      >
        <h5 className="text-gray-300">Posted {formattedDiff} ago</h5>
        <h2 className="text-white text-2xl font-medium font-inter">{title}</h2>
      </div>
    </Link>
  );
};

BlogsBanner.propTypes = {
  blog: PropTypes.object,
};

export default BlogsBanner;
