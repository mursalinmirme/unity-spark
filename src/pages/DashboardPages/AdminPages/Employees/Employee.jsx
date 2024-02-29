import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import AllEmployeesTable from "./AllEmployeesTable";

const Employee = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allEmployees = [], refetch } = useQuery({
    queryKey: ["allEmployees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees");
      return res?.data;
    },
  });

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <h4 className="text-2xl font-semibold mb-5">All Employees List</h4>
        <table style={{ borderRadius: "50px" }} className="table border ">
          {/* head */}
          <thead className="bg-second text-white text-[18px] rounded-md text-center">
            <tr className="text-center">
              <th>
                <label>#</label>
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position </th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody className="mt-20">
            {allEmployees?.map((user, idx) => (
              <AllEmployeesTable
                key={user?._id}
                idx={idx}
                refetch={refetch}
                user={user}></AllEmployeesTable>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
