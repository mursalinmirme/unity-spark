import { useQuery } from "@tanstack/react-query";
import AllUsersTable from "./AllUsersTable";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import AllUsersSkeleton from "./AllUsersSkeleton";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allUsers = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <h3 className="text-2xl font-semibold">Our All Users</h3>
        <table className="table border mt-5">
          {/* head */}
          <thead className="bg-second text-white text-[18px] rounded-md text-center">
            <tr className="text-left">
              <th className="h-12">#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
            </tr>
          </thead>
          {isFetching ? (
            <AllUsersSkeleton></AllUsersSkeleton>
          ) : (
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
          )}
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
