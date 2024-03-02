import { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { toast } from 'sonner';
import PropTypes from "prop-types";

const AllEmployeesTable = ({ user, idx, refetch }) => {
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
    <tr key={user?._id} className="text-base">
      <td className="text-left">
        <label className="font-semibold">{idx + 1}</label>
      </td>

      <td>
        <div className="flex justify-center gap-3">
          <div className="avatar ">
            <div className="w-12 h-12 rounded-full">
              <img src={user?.image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <td className="text-left">{user?.name}</td>
      <td className="text-left">{user?.email}</td>

      <td>
        {user?.position === "guest" ? (
          <p className="text-second text-left">{user?.position} </p>
        ) : (
          <p className="text-gray-800 font-medium text-left">
            {user?.position}{" "}
          </p>
        )}
      </td>
      <td className="font-bold">
        <select
          onChange={handleChangeRole}
          className="py-2 rounded-lg hover:cursor-pointer font-semibold text-left"
          defaultValue={newRole}
          name=""
          id="">
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
      </td>
    </tr>
  );
};

AllEmployeesTable.propTypes = {
  user: PropTypes.object,
  idx: PropTypes.number,
  refetch: PropTypes.func,
};

export default AllEmployeesTable;
