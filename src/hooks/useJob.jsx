import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const useJob = () => {
  const { data: jobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axios("/JobPost.json");
      console.log(res.data);
      return res.data;
    },
  });

  return [jobs];
};

export default useJob;
