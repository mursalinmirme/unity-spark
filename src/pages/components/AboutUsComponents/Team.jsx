import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import facebook from "./../../../assets/social/facebook.png";
import instagram from "./../../../assets/social/instagram.png";
import linkedIn from "./../../../assets/social/linkedin.png";
import "./Team.css";
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
    <div className="about_team lg:mt-10 mb-10">
      <h2 className="text-center">Meet the Founders</h2>
      <p className="text-[#1E1E1E] font-inter font-medium mx-auto mt-3 text-center px-10 lg:px-0">
      Meet the visionaries behind Unity Spark. Learn about their inspiration.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 mt-10 px-8 lg:px-0">
        {team?.map((singleMember, idx) => (
          <div className="relative mb-7 foundersCard" key={idx}>
            <div>
            <figure>
              <img className="w-full" src={singleMember.image} />
            </figure>
            <div className="text-center mt-3">
              <p className=" text-2xl font-bold">{singleMember.name}</p> 
              <p className="text-xl font-medium">{singleMember.position}</p>
            </div>
            </div>
            <div className="absolute bottom-28 w-full socialIcons">
            <div className="flex justify-center w-full">
            <div className="flex gap-3 bg-[#d9d9d9b3] justify-center max-w-[150px] py-4 rounded-2xl px-5">
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
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
