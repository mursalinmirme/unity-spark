import useUsers from "../../../../hooks/useUsers";
import DashboardUsersSkeleton from "./DashboardUsersSkeleton";
import DashboardUsersTable from "./DashboardUsersTable";


const NewUsersTable = () => {
    const {allUsers, isFetching} = useUsers()

    return (
        <table className="w-full mt-5">
          {/* head */}
          <thead className="bg-second text-white text-[18px] rounded-md text-center">
            <tr className="text-left !border-none">
              <th className="!border-none">Image</th>
              <th className="!border-none">Name</th>
              <th className=" !border-none">Email</th>
              <th className=" !border-none">Gender</th>
            </tr>
          </thead>
          {
            isFetching ? <DashboardUsersSkeleton></DashboardUsersSkeleton> : 
            <tbody className="">
            {allUsers &&
              allUsers?.map((user) => (
                <DashboardUsersTable
                  user={user}
                  key={user._id}></DashboardUsersTable>
              )).slice(0, 6)}
          </tbody>
          }
        </table>
    );
};

export default NewUsersTable;