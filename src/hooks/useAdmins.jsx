import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmins = () => {    
  const axiosSecure = useAxiosSecure()
  const { data: allAdmins = [] } = useQuery({
    queryKey: ["allAdmins"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-admins");
      return res?.data;
    },
  });

  return {allAdmins}
};

export default useAdmins;