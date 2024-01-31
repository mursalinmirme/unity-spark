import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: isUser = [], isLoading } = useQuery({
    queryKey: ["user-role"],
    enabled: !!user?.email,
    queryFn: async () => {
      // ToDo : replace mursalinmir02@gmail.com to user?.email
      const res = await axiosPublic.get(`/user-role?email=${user?.email}`);
      return res.data;
    },
  });
  return [isUser, isLoading];
};

export default useUserRole;
