import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useMyCourse = () => {
    const axiosSecure = useAxiosSecure();
    const { data: jobs } = useQuery({
        queryKey: ["my_courses"],
        queryFn: async () => {
          const res = await axiosSecure.get("/course_info.json");
          console.log(res.data);
          return res.data;
        },
    });
    
      return [jobs];
};

export default useMyCourse;