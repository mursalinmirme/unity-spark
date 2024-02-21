import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useChatMessage = () => {
    const { data: friends = [], isPending , refetch } = useQuery({
        queryKey: ["chat_message"],
        queryFn: async () => {
          const res = await axios.get("/chats.json");
          return res.data;
        },
    });
    
    return {friends, isPending , refetch};
};

export default useChatMessage;