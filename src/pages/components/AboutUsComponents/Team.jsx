import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Team = () => {
  const { isPending, data: team } = useQuery({
    queryKey: ["team_info"],
    queryFn: async () => {
      const res = await axios.get("team_info.json");
      return res.data;
    },
  });

  console.log(team);

  return (
    <div className="about_team mt-10">
      <h2 className="text-center">Meet the Founders</h2>
      <p className="text-[#1E1E1E] text-center font-inter font-bold max-w-[700px] mx-auto mt-3">
        Introduce the founders or leaders of your company. Share their vision,
        inspiration, and the story behind the inception of the business.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {team?.map((singleMember, idx) => (
          <div key={idx}>
            <figure>
              <img
                className="w-full"
                src={singleMember.image}
                alt={singleMember.name}
              />
            </figure>
            <div className="flex justify-center">
              <p>{singleMember.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
