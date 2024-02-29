import PropTypes from "prop-types";

const AllUsersTable = ({ user, idx }) => {
  return (
    <tr className="border-b-2">
      <td className="text-left font-semibold">{idx + 1}</td>
      <td className="pr-10">
        <div>
          <div className="avatar flex justify-center">
            <div className="mask mask-squircle w-12 h-12">
              <img src={user.image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <td className="text-left">{user?.name}</td>
      <td className="text-left">{user?.email}</td>
    </tr>
  );
};

AllUsersTable.propTypes = {
  user: PropTypes.object,
  idx: PropTypes.number,
  refetch: PropTypes.func,
};

export default AllUsersTable;
