import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
const useUserInfo = () => {
  const axiosSecure = useAxiosSecure()
  const { user, setProfileComplete } = useContext(AuthContext);
  const { data: users = [], isFetching } = useQuery({
    queryKey: ["user_infor"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/${user?.email}`);  
      let profileCount = 0;
  
      profileCount += res.data.name ? 7.142 : 0
      profileCount += res.data.image ? 7.142 : 0
      profileCount += res.data.email ? 7.142 : 0
      profileCount += res.data.gender ? 7.142 : 0
      profileCount += res.data.age ? 7.142 : 0
      profileCount += res.data.skills?.length > 0 ? 7.142 : 0
      profileCount += res.data.current_address ? 7.142 : 0
      profileCount += res.data.permanent_address ? 7.142 : 0
      profileCount += res.data.institute_name ? 7.142 : 0
      profileCount += res.data.phone ? 7.142 : 0
      profileCount += res.data.resume_link ? 7.142 : 0
      profileCount += res.data.time_preference ? 7.142 : 0
      profileCount += res.data.job_preference ? 7.142 : 0
      profileCount += res.data.education_level ? 7.142 : 0
  
      setProfileComplete(profileCount)
      return res.data;
    },
  });

  return [users, isFetching];
};

export default useUserInfo;