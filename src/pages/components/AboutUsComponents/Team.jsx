import { useQuery } from "@tanstack/react-query";
import facebook from "./../../../assets/social/facebook.png";
import instagram from "./../../../assets/social/instagram.png";
import linkedIn from "./../../../assets/social/linkedin.png"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import TeamSkeleton from "./TeamSkeleton";


const Team = () => {
  const axiosPublic = useAxiosPublic() 
  const { data: team , isFetching } = useQuery({
    queryKey: ["team_info"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allFounder");
      return res.data;
    },
  });
  if(isFetching){
    return <TeamSkeleton></TeamSkeleton>
  }

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
              <p>{singleMember.name}</p> 
              <p>{singleMember.position}</p>
            </div>
            <div className="socialIcons">
                <div style={{boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}}>
                  <a href={singleMember.FB}>
                    <img src={facebook} alt="" />
                  </a>
                  <a href={singleMember.IG}>
                    <img src={instagram} alt="" />
                  </a>
                  <a href={singleMember.LINK}>
                    <img src={linkedIn} alt="" />
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
