import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BlogRequestsRow = ({ blogRequest, idx }) => {
  console.log(blogRequest);
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{blogRequest.title}</td>
      <td>{blogRequest?.bloggerInfo?.name}</td>
      <td>
        <div>
          <Link
            className="bg-primary w-8 h-7 mx-auto rounded-md flex items-center justify-center text-white"
            to={`/dashboard/adminBlogDetails/${blogRequest._id}`}>
            <IoEyeOutline></IoEyeOutline>
          </Link>
        </div>
      </td>
    </tr>
  );
};

BlogRequestsRow.propTypes = {
  blogRequest: PropTypes.object,
  idx: PropTypes.number,
};

export default BlogRequestsRow;
