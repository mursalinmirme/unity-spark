import { useQuery } from "@tanstack/react-query";
import facebook from "./../../../assets/social/facebook.png";
import instagram from "./../../../assets/social/instagram.png";
import linkedIn from "./../../../assets/social/linkedin.png"
import axios from "axios";


const Team = () => {
 
  const { data: team } = useQuery({
    queryKey: ["team_info"],
    queryFn: async () => {
      const res = await axios.get("team_info.json");
      return res.data;
    },
  });

  return (
    <div className="about_team">
      <h2 className="text-center">Meet the Founders</h2>
      <p>Meet the visionaries behind Unity Spark. Learn about their inspiration.</p>

      <div className="team_container">
        {team?.map((singleMember, idx) => (
          <div className="founders_card" key={idx}>
            <div>
            <figure>
              <img src={singleMember.image} />
            </figure>
            <div className="founder_info">
              <p>{singleMember?.name}</p> 
              <p>{singleMember?.position}</p>
            </div>
            </div>
            <div className="socialIcons">
                <div>
                  <a href={singleMember?.fb}>
                    <img src={facebook} alt="" />
                  </a>
                  <a href={singleMember?.ig}>
                    <img src={instagram} alt="" />
                  </a>
                  <a href={singleMember?.link}>
                    <img src={linkedIn} alt="" />
                  </a>
                </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
