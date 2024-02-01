import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./Employee.css";
const Employee = () => {
  const { data: allUsers = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users");
      return res?.data;
    },
  });

  console.log(allUsers);

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table-no-border ">
          {/* head */}
          <thead className="bg-primary text-white text-[18px] h-[70px] rounded-lg text-center ">
            <tr>
              <th>
                <label>#</label>
              </th>

              <th>Name</th>
              <th>Email</th>
              <th>Profile Picture</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user, idx) => (
              <tr key={user?._id}>
                <td>
                  <label>{idx + 1}</label>
                </td>

                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  <div className="flex justify-center gap-3">
                    <div className="avatar ">
                      <div className="w-12 h-12 rounded-full">
                        <img
                          src={user?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <p>{user?.position} </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
