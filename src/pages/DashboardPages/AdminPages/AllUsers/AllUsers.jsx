import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import AllUsersTable from "./AllUsersTable";

const AllUsers = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: async () => {
      const result = await axiosPublic.get("/users");
      return result.data;
    },
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <h3 className="text-2xl font-semibold">Our All Users</h3>
        <table className="table-no-border table mt-5">
          {/* head */}
          <thead className="bg-[#726eec] text-white text-[18px] rounded-md text-center">
            <tr className="text-left">
              <th>Serial</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody className="">
            {allUsers &&
              allUsers?.map((user, idx) => (
                <AllUsersTable
                  user={user}
                  key={user._id}
                  idx={idx}
                  refetch={refetch}></AllUsersTable>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
