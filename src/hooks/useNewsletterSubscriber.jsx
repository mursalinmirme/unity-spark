import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useNewsletterSubscriber = () => {
    const axiosSecure = useAxiosSecure()
    const { data: subscribers, isFetching } = useQuery({
        queryKey: ["getSubscribers"],
        queryFn: async () => {
          const result = await axiosSecure.get("/subscribers");
          return result.data;
        },
      });

    return {subscribers, isFetching}
};

export default useNewsletterSubscriber;