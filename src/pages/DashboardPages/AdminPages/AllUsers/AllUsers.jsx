import { useQuery } from "@tanstack/react-query";
import AllUsersTable from "./AllUsersTable";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <h3 className="text-3xl font-semibold">All our users</h3>
        <table className="table-no-border table mt-10">
          {/* head */}
          <thead className="bg-[#726eec] text-white text-[18px] rounded-md text-center">
            <tr className="text-center">
              <th>Serial</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
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
