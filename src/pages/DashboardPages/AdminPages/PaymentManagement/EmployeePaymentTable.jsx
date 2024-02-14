const EmployeePaymentTable = ({ employee }) => {
  console.log(employee);
  return (
    <tr className="row-border border-r-2 border-r-[#45A5E1]">
      <td>{employee?.name}</td>
      <td>{employee?.position}</td>
      <td>{employee?.salary ? employee?.salary : "$5000"}</td>
      <td>
        <button className="bg-[#433EBE] text-white px-4 rounded-2xl py-1">
          Pay
        </button>
      </td>
    </tr>
  );
};

export default EmployeePaymentTable;
