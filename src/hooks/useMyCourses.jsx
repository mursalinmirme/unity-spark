import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useMyCourses = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useContext(AuthContext)
    const { data: my_course = []} = useQuery({
        queryKey: ["my_courseAll"],
        queryFn: async () => {
          const res = await axiosPublic.get(`/my_course/${user?.email}`);
          return res.data;
        },
    });

    return [my_course]
};

export default useMyCourses;