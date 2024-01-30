import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Provider/AuthProvider";
import google_Icon from "../../../../assets/images/google-icon.png";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
const Social_Media = ({ setSignInLoading }) => {
  const { googleLoginSystem } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handlerGoogleLogin = () => {
    setSignInLoading(true);
    googleLoginSystem()
      .then((res) => {
        const newUser = {
          name: res?.user?.displayName,
          email: res?.user?.email,
          image: res?.user?.photoURL,
        };
        axios
          .post("https://unity-spark-server.vercel.app/users", newUser)
          .then(() => {
            axios
              .get(
                `https://unity-spark-server.vercel.app/user-role?email=${res?.user?.email}`
              )
              .then((resp) => {
                if (resp.data.role === "user") {
                  setSignInLoading(false);
                  navigate("/");
                  toast.success("User Login Successfully");
                }
                if (resp.data.role === "admin") {
                  setSignInLoading(false);
                  navigate("/");
                  toast.success("Admin Login Successfully");
                }
                if (resp.data.role === "employee") {
                  setSignInLoading(false);
                  navigate("/"); //it will update after complete the admin dashboard ---
                  toast.success("Employee Login Successfully");
                }
              })
              .catch((err) => {
                setSignInLoading(false);
                toast.error(err.message);
              });
          })
          .catch((err) => {
            toast.error(err.message);
            setSignInLoading(false);
          });
      })
      .catch((error) => {
        toast.error(error.message);
        setSignInLoading(false);
      });
  };

  return (
    <div onClick={handlerGoogleLogin}>
      <div className="flex justify-center">
        {" "}
        <span className="border btn-outline cursor-pointer border-[#433EBE] px-3 py-1.5 rounded-md w-full  flex items-center justify-center gap-2 text-sm">
          <span>
            <img className="h-5" src={google_Icon} alt="Google" />
          </span>{" "}
          Sign Up with Google
        </span>
      </div>
    </div>
  );
};

export default Social_Media;
