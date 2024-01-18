import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import facebook from "./../../../assets/social/facebook.png";
import instagram from "./../../../assets/social/instagram.png";
import linkedIn from "./../../../assets/social/linkedin.png";

const Team = () => {
  const { data: team } = useQuery({
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
      <p className="text-[#1E1E1E] text-center font-inter font-medium max-w-[700px] mx-auto mt-3">
        Introduce the founders or leaders of your company. Share their vision,
        inspiration, and the story behind the inception of the business.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {team?.map((singleMember, idx) => (
          <div key={idx}>
            <figure>
              <img className="w-[350px]" src={singleMember.image} />
            </figure>
            <div className="text-center mt-3">
              <p className=" text-2xl font-bold">{singleMember.name}</p>
              <p className="text-xl font-medium">{singleMember.position}</p>
            </div>
            <div className="flex gap-3 bg-[#d9d9d9b3] justify-center max-w-[150px] py-4 rounded-2xl">
              <a href="facebook.com">
                <img className="w-[30px]" src={facebook} alt="" />
              </a>
              <a href="instagram.com">
                <img className="w-[30px]" src={instagram} alt="" />
              </a>
              <a href="linkedin.com">
                <img className="w-[30px]" src={linkedIn} alt="" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
