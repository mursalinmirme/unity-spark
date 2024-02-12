import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";

const useUserId = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: userId, isLoading:userIdLoading } = useQuery({
      queryKey: ["user-id", user?.email],
      enabled: !!user?.email,
      queryFn: async () => {
        // ToDo : replace mursalinmir02@gmail.com to user?.email
        const res = await axiosSecure.get(`/user-id?email=${user?.email}`);
        return res.data;
      },
    });
    return [userId, userIdLoading];
};

export default useUserId;