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
        <h3 className="text-[30px] font-bold font-inter">
          Why we are different?
        </h3>
        <p className="pt-3 text-[#475569] font-inter">
          <span className="text-[20px] font-semibold font-poppins text-slate-800">
            Innovative Solutions :
          </span>{" "}
          <span className="font-medium">At Unity Spark, we aim to deliver innovative solutions that set us apart in the industry. Our commitment to utilizing cutting-edge technology ensures your unique needs are met with forward-thinking solutions, making us a standout choice in the professional landscape.</span>
        </p>
        <p className="pt-3 text-[#475569] font-inter">
          <span className="text-[20px] font-semibold font-poppins text-slate-800">
            Tech Driven Recruitment:
          </span>{" "}
          <span className="font-medium">Unity Spark introduces a tech-driven recruitment process, utilizing cutting-edge technology for a smooth, modern, and efficient hiring journey. Experience a new way of connecting employers with candidates, making hiring hassle-free and effective for everyone involved.</span>
        </p>
        <p className="pt-3 text-[#475569] font-inter">
          <span className="text-[20px] font-semibold font-poppins text-slate-800">
            Engaging Community:
          </span>
          <span className="font-medium">{" Step into Unity Spark's vibrant community, where professionals unite to share insights, connect, and collaborate. Join us to be part of this dynamic network, fostering growth and meaningful interactions. Your journey towards success starts here!"}</span>
        </p>
        <Link onClick={newSystem} to="/our-vision">
          <button className="nbtn mt-7 "> Explore More</button>
        </Link>
      </div>
    </div>
  );
};

export default WhyDifferent;
