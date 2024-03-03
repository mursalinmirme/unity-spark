import { useContext } from "react";
import img from "../../../../assets/images/different-img.jpg";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { toast } from "sonner";
const WhyDifferent = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex border-2   my-11 flex-col lg:flex-row">
      <div className="flex-1">
        <img className=" h-[400px] w-full" src={img} alt="" />
      </div>
      <div className="flex-1 mt-14 py-2 p-1">
        <h3 className="text-[24px] font-bold font-inter ">
          Why are you different
        </h3>
        <p className="pt-3 text-[#646f7e]">
          Unity Spark revolutionizes team collaboration with its smart chatting
          system, enhancing connections through advanced matching algorithms.
          Our platform showcases augmented user profiles for a full view of
          achieve, promoting meaningful interactions in our diverse community.
          Features like smart notifications and anonymous feedback foster an
          innovative, efficie, and inclusive workplace culture. Join Unity Spark
          for a superior collaboration experience.
        </p>
        <button
          onClick={() =>
            toast.success(
              user?.displayName
                ? `WelCome ${user?.displayName}`
                : "Please Before Login Must Be"
            )
          }
          className="nbtn mt-7 "
        >
          {" "}
          Explore More
        </button>
      </div>
    </div>
  );
};

export default WhyDifferent;
