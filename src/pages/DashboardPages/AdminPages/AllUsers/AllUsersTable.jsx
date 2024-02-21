import PropTypes from "prop-types";
import { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
const AllUsersTable = ({ user, idx, refetch }) => {
  const [newRole, setNewRole] = useState(user?.role);
  const axiosPublic = useAxiosPublic();

  const handleChangeRole = (e) => {
    const updatedRole = e.target.value;
    axiosPublic
      .put(`/user-role/${user._id}`, { role: updatedRole })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success(`Role set to ${updatedRole}`);
          setNewRole(updatedRole);
          refetch();
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

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
      <td className="font-bold">
        <select
          onChange={handleChangeRole}
          className="py-2 rounded-lg hover:cursor-pointer text-left"
          defaultValue={newRole}
          name=""
          id="">
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
      </td>
    </tr>
  );
};

AllUsersTable.propTypes = {
  user: PropTypes.object,
  idx: PropTypes.number,
  refetch: PropTypes.func,
};

export default AllUsersTable;
