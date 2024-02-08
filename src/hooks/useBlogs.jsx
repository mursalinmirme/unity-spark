import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBlogs = () => {
    const { data: blogs } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
          const res = await axios.get("http://localhost:5000/blogs");
          return res.data;
        },
    });
    return {blogs};
};

export default useBlogs;