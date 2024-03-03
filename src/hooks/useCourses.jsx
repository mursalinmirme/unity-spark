import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCourses = () => {
    const axiosPublic = useAxiosPublic()
    const { data: courses = [], isPending , refetch, isFetching } = useQuery({
        queryKey: ["courseData"],
        queryFn: async () => {
          const res = await axiosPublic.get("/courses");
          return res.data;
        },
    });
    
    return [courses, isPending , refetch, isFetching];
};

export default useCourses;