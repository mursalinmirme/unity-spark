import { useQuery } from "@tanstack/react-query";
import EmployeePaymentTable from "./EmployeePaymentTable";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import EmployeesPaymentSkeleton from "./EmployeesPaymentSkeleton";

const EmployeesPayment = () => {
  const axiosSecure = useAxiosSecure();

  const { data: employees = [], isFetching } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const result = await axiosSecure.get("/employees");
      return result.data;
    },
  });

  return (
    <div>
      {isFetching ? (
        <EmployeesPaymentSkeleton></EmployeesPaymentSkeleton>
      ) : (
        <div>
          <table className="table mt-10">
            {/* head */}
            <thead className="bg-[#45A5E1] text-white">
              <tr className="row-border table-style">
                <th>Name</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees &&
                employees?.map((employee, idx) => (
                  <EmployeePaymentTable
                    key={employee?._id}
                    employee={employee}
                    idx={idx}></EmployeePaymentTable>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeesPayment;
