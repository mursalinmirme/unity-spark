import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SavedBlogCard = ({ singleBlog }) => {
  console.log(singleBlog);
  return (
    <div className="rounded-xl px-5 py-3 shadow-md">
      <div>
        <img
          className="rounded-xl w-full h-[200px]"
          src={singleBlog?.blogInfo?.image}
          alt=""
        />
      </div>
      <div>
        <h2 className="mt-3 text-lg font-semibold">
          {singleBlog?.blogInfo?.title.length > 55
            ? singleBlog?.blogInfo?.title.slice(0, 55) + "..."
            : singleBlog?.blogInfo?.title}
        </h2>

        <Link to={`/blog-details/${singleBlog?.blogInfo?._id}`}>
          <button className="nbtn mt-3">See Details</button>
        </Link>
      </div>
    </div>
  );
};

SavedBlogCard.propTypes = {
  singleBlog: PropTypes.object,
};

export default SavedBlogCard;
