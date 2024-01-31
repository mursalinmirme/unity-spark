import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Provider/AuthProvider";
import google_Icon from "../../../../assets/images/google-icon.png";
const Social_Media = ({ setGoogleLoading, googleLoading }) => {
  const { googleLoginSystem } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlerGoogleLogin = () => {
    setGoogleLoading(true);
    googleLoginSystem()
      .then((res) => {
        const newUser = {
          name: res?.user?.displayName,
          email: res?.user?.email,
          image: res?.user?.photoURL,
        };
        axios
          .post("http://localhost:5000/users", newUser)
          .then(() => {
            axios
              .get(`http://localhost:5000/user-role?email=${res?.user?.email}`)
              .then((resp) => {
                if (resp.data.role === "user") {
                  setGoogleLoading(false);
                  navigate("/");
                  toast.success("User Login Successfully");
                }
                if (resp.data.role === "admin") {
                  setGoogleLoading(false);
                  navigate("/");
                  toast.success("Admin Login Successfully");
                }
                if (resp.data.role === "employee") {
                  setGoogleLoading(false);
                  navigate("/"); //it will update after complete the admin dashboard ---
                  toast.success("Employee Login Successfully");
                }
              })
              .catch((err) => {
                setGoogleLoading(false);
                toast.error(err.message);
              });
          })
          .catch((err) => {
            toast.error(err.message);
            setGoogleLoading(false);
          });
      })
      .catch((error) => {
        toast.error(error.message);
        setGoogleLoading(false);
      });
  };

  return (
    <div onClick={handlerGoogleLogin}>
      <div className="flex justify-center">
        {googleLoading ? (
          <span className="border py-2.5 rounded-md loading loading-spinner loading-md"></span>
        ) : (
          <span className="border btn-outline cursor-pointer border-[#433EBE] px-3 py-2.5 rounded-md w-full  flex items-center justify-center gap-2 text-sm">
            <span>
              <img className="h-5" src={google_Icon} alt="Google" />
            </span>{" "}
            Sign Up with Google
          </span>
        )}
      </div>
    </div>
  );
};

export default Social_Media;
