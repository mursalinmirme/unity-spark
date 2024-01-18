import "./aboutUs.css";

import Banner from "../components/AboutUsComponents/Banner";
import Team from "../components/AboutUsComponents/Team";

const AboutUs = () => {
  return (
    <div className="w-[1200px] mx-auto">
      <Banner></Banner>
      <Team></Team>
    </div>
  );
};

export default AboutUs;
