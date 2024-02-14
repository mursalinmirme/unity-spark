import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCourses = () => {
    const { data: courses, isPending } = useQuery({
        queryKey: ["my_courses"],
        queryFn: async () => {
          const res = await axios.get("/course_info.json");
          return res.data;
        },
    });
    
    return [courses, isPending];
};

export default useCourses;