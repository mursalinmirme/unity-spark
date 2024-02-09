import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useJob = () => {
  const { data: jobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axios.get("/JobPost.json");
      console.log(res.data);
      return res.data;
    },
  });

  return [jobs];
};

export default useJob;
