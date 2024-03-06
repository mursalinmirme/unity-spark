import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ["payment-history"],
        queryFn: async () => {
        const result = await axiosSecure.get("/payment-details");
        return result.data;
        },
    });

    return {payments}
};

export default usePaymentHistory;