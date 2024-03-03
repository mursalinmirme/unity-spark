import img from "../../../../assets/images/different-section.png";
import { Link } from "react-router-dom";
const WhyDifferent = () => {
  // this function just click link and top page show
  const newSystem = () => {
    window.scrollTo({ top: 1, behavior: "smooth" });
  };
  return (
    <div className="flex flex-col lg:flex-row items-center">
      <div className="flex-1">
        <img className=" w-full" src={img} alt="" />
      </div>
      <div className="flex-1 mt-7 py-2 p-1">
        <h3 className="text-[24px] font-bold font-inter ">
          Why are you different
        </h3>
        <p className="pt-3 text-[#646f7e]">
          <span className="text-[20px] font-semibold text-slate-800">
            Unity Spark :
          </span>{" "}
          At Unity Spark, we revolutionize collaboration with our unique
          Chatting System, connecting team members through smart matching
          algorithms. Augmented user profiles provide a comprehensive view of
          individual achievements, fostering meaningful connections within our
          diverse community.
        </p>
        <p className="pt-3 text-[#646f7e]">
          <span className="text-[20px] font-semibold text-slate-800">
            Unlike traditional :
          </span>{" "}
          Unlike traditional platforms, our system integrates real-time
          collaboration tools, transforming conversations into dynamic and
          productive working sessions. Multilingual support ensures inclusivity,
          allowing seamless communication in preferred languages.
        </p>
        <p className="pt-3 text-[#646f7e]">
          <span className="text-[20px] font-semibold text-slate-800">
            Smart notifications :
          </span>{" "}
          Smart notifications prioritize important messages, while an anonymous
          feedback channel encourages open comm unication and improvement. Join
          us in creating an innovative, efficient, and inclusive workplace
          culture at Unity Spark, where every feature is designed for a superior
          collaboration experience.
        </p>
        <Link onClick={newSystem} to="/our-vision">
          <button className="nbtn mt-7 "> Explore More</button>
        </Link>
      </div>
    </div>
  );
};

export default WhyDifferent;
