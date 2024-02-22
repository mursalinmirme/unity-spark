import moment from "moment";
import PropTypes from "prop-types";

const BlogComments = ({ comment }) => {
  const timeOfComment = comment?.createdAt;
  const timeDifference = moment(timeOfComment).fromNow();
  return (
    <div className="mt-5">
      <div className="flex gap-4">
        <img
          className="w-12 h-12 rounded-full"
          src={comment?.commenterInfo?.image}
          alt=""
        />
        <div>
          <div className="flex items-center gap-6">
            <h4 className="font-semibold text-lg">
              {comment?.commenterInfo?.name}
            </h4>
            <p className="text-xs font-light font-inter">{timeDifference}</p>
          </div>
          <p>{comment?.commentTxt}</p>
        </div>
      </div>
    </div>
  );
};

BlogComments.propTypes = {
  comment: PropTypes.object,
};

export default BlogComments;
