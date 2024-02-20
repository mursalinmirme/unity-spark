import { useQuery } from "@tanstack/react-query";
import EmployeePaymentTable from "./EmployeePaymentTable";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const EmployeesPayment = () => {
  const axiosSecure = useAxiosSecure()

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const result = await axiosSecure.get("/employees");
      return result.data;
    },
  });

  return (
    <div>
      <div>
        <table className="table border-[#45A5E1] mt-10">
          {/* head */}
          <thead className="bg-[#45A5E1] text-white text-[18px] text-center">
            <tr className="row-border border-2 border-[#45A5E1] rounded-lg">
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
    </div>
  );
};

export default EmployeesPayment;
