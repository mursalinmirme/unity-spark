import usePaymentHistory from "../../../../hooks/usePaymentHistory";

const PaymentHistory = () => {
    const {payments} = usePaymentHistory()
    

    return (
        <div>
            <table className="table mt-10">
          {/* head */}
          <thead className="bg-[#45A5E1] text-white">
            <tr className="row-border table-style">
              <th>Paid To</th>
              <th>Paid By</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments &&
              payments?.map((payment, idx) => (
                <tr key={idx} className="row-border table-style">
                    <td>{payment?.payment_email}</td>
                    <td>{payment?.admin_name ? payment?.admin_name : 'Admin'}</td>
                    <td>{payment.transactionId}</td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
    );
};

export default PaymentHistory;