import { useQuery } from "@tanstack/react-query";
import maintainance from "../../../../assets/images/maintainance.png";

import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const AllUsers = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allUsers = [] } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: async () => {
      const result = await axiosPublic.get("/users");
      return result.data;
    },
  });

  console.log(allUsers);
  return (
    <div>
      <img src={maintainance} className="w-3/4 mx-auto" alt="" />
    </div>
  );
};

export default AllUsers;
