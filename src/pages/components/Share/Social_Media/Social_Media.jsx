import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import toast from "react-hot-toast";
import google_Icon from "../../../../assets/images/google-icon.png";
import { useNavigate } from "react-router-dom";
const Social_Media = () => {
  const { googleLoginSystem } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlerGoogleLogin = () => {
    googleLoginSystem()
      .then(() => {
        toast.success("Google Login Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div onClick={handlerGoogleLogin}>
      <div className="flex justify-center">
        {" "}
        <span className="border btn-outline cursor-pointer border-green-400 px-3 py-1.5 rounded-md w-full max-w-xs flex items-center justify-center gap-2 text-sm">
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
