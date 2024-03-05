import { useContext } from "react";
import BannerImg from "../../../../assets/images/banner.gif";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import useUserRole from "../../../../hooks/useUserRole";
import { toast } from "sonner";

const Banner = () => {
  const { user } = useContext(AuthContext);
  const [isUser] = useUserRole();
  return (
    <div className="banner">
      <div className="slide_container">
        {/* Banner Text here */}
        <div className="space-y-3 md:space-y-6">
          <span>Hi there</span>
          <h2>Elevate Your Workforce Management</h2>
          <p>
            Enhance efficiency and engagement with our comprehensive HR
            solutions. Streamline processes, elevate workplace experience, and
            transform operations today.
          </p>

          {user?.email ? (
            <button
              onClick={() => toast.success(`WelCome ${user?.displayName}`)}
              className="nbtn mt-2"
            >
              Get Started Today
            </button>
          ) : (
            <Link to="/signin">
              <button className="nbtn mt-2">Get Started Today</button>
            </Link>
          )}
        </div>
        {/* Banner Image */}
        <div>
          <img src={BannerImg} className="w-full" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
