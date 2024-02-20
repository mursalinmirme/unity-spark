import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";
import axios from "axios";

const useChatFriend = () => {
    // const axiosPublic = useAxiosPublic()
    const { data: friends = [], isPending , refetch } = useQuery({
        queryKey: ["chat_friends"],
        queryFn: async () => {
          const res = await axios.get("/chat_user.json");
          return res.data;
        },
    });
    
    return {friends, isPending , refetch};
};

export default useChatFriend;