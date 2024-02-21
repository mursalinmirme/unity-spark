import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useChatFriend = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: friends = [], isPending , refetch } = useQuery({
        queryKey: ["chat_friends"],
        queryFn: async () => {
          const res = await axiosSecure.get(`/chat-friends?email=${user?.email}`);
          return res.data;
        },
    });
    
    return {friends, isPending , refetch};
};

export default useChatFriend;