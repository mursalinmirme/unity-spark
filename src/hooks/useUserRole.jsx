import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isUser = [], isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      // ToDo : replace mursalinmir02@gmail.com to user?.email
      const res = await axiosSecure.get(`/user-role?email=${user?.email}`);
      return res.data;
    },
  });
  return [isUser, isLoading];
};

export default useUserRole;
