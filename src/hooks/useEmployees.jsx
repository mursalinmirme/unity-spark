
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useEmployees = () => {    
  const axiosSecure = useAxiosSecure()
  const { data: allEmployees = [] } = useQuery({
    queryKey: ["allEmployees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-employees");
      return res?.data;
    },
  });

  return {allEmployees}
};

export default useEmployees;