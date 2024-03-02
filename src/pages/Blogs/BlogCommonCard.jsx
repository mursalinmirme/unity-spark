import moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BlogCommonCard = ({ blog }) => {
  const { title, description, _id, image, createdAt } = blog || {};
  const today = new Date();
  const secondsDiff = moment(today).diff(moment(createdAt), "seconds");

  const formattedDiff = moment.duration(secondsDiff, "seconds").humanize();

  return (
    <div className="border border-gray-300 p-2 mt-5 rounded-xl grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-5 items-center">
      <Link to={`/blog-details/${_id}`}>
        <img
          src={image}
          className="h-44 md:h-36 rounded-xl w-full col-span-1 md:col-span-2 lg:col-span-1"
        />
      </Link>
      <div className="col-span-1 md:col-span-4 space-y-2 py-2">
        <p className="font-medium text-gray-700">Posted {formattedDiff} ago</p>
        <h2 className="text-2xl font-semibold font-inter block md:hidden lg:block">
          {title}
        </h2>
        <h2 className="text-2xl font-semibold font-inter hidden md:block lg:hidden">
          {title.length > 50 ? `${title.slice(0, 50)}...` : title}
        </h2>
        <p className="font-medium text-gray-600 block md:hidden lg:block">
          {description?.length > 210
            ? description?.slice(3, 210)
            : description?.slice(0, 3)}
          ...
          <Link to={`/blog-details/${_id}`}>
            <span className="underline text-gray-700">Read More</span>
          </Link>
        </p>
        <p className="font-medium text-gray-600 hidden md:block lg:hidden">
          {description?.length > 100 ? description?.slice(0, 100) : description}
          <Link to={`/blog-details/${_id}`}>
            {" "}
            <span className="underline text-gray-700">Read More</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

BlogCommonCard.propTypes = {
  blog: PropTypes.object,
};

export default BlogCommonCard;
