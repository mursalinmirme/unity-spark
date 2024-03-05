import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {    
  const axiosSecure = useAxiosSecure()
  const { data: allUsers = [], refetch, isFetching } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  return {allUsers, refetch, isFetching}
};

export default useUsers;