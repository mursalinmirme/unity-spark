import AllUsersTable from "./AllUsersTable";
import AllUsersSkeleton from "./AllUsersSkeleton";
import useUsers from "../../../../hooks/useUsers";

const AllUsers = () => {
  const {allUsers, refetch, isFetching} = useUsers()

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
