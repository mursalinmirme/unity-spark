import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const { data: isUser = [], isLoading } = useQuery({
    queryKey: ["user-role"],
    enabled: !!user?.email,
    queryFn: async () => {
      // ToDo : replace mursalinmir02@gmail.com to user?.email
      const res = await axios.get(
        `https://unity-spark-server.vercel.app/user-role?email=${user?.email}`
      );
      return res.data;
    },
  });
  return [isUser, isLoading];
};

export default useUserRole;
