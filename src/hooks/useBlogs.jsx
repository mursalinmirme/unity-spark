import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBlogs = () => {
    const { data: blogs } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
          const res = await axios.get("blogs.json");
          return res.data;
        },
    });
    return {blogs};
};

export default useBlogs;