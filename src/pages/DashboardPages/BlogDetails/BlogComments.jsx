import PropTypes from "prop-types";

const BlogComments = ({ comment }) => {
  return (
    <div className="mt-5">
      <div className="flex gap-4">
        <img
          className="w-12 h-12 rounded-full"
          src={comment?.commenterInfo?.image}
          alt=""
        />
        <div>
          <h4 className="font-semibold">{comment?.commenterInfo?.name}</h4>
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
