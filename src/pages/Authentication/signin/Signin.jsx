/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import signIn_image from "../../../assets/images/signin.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "sonner";
import Social_Media from "../../components/Share/Social_Media/Social_Media";
import { IoEyeOutline } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Signin = () => {
  const PublicAxios = useAxiosPublic();
  const { userSignIn } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setSignInLoading(true);
    // User Login Method
    userSignIn(data?.email, data?.password)
      .then((res) => {
        PublicAxios.get(`/user-role?email=${res?.user?.email}`)
          .then((resp) => {
            if (resp.data.role) {
              reset();
              setSignInLoading(false);
              navigate("/");
              toast.success("Login Successfully");
            }
            //  if(resp.data.role === 'admin') {
            //   reset();
            //   setSignInLoading(false);
            //   navigate("/dashboard"); //it will update after complete the admin dashboard
            //   toast.success("Login Successfully");
            //  }
          })
          .catch((err) => {
            setSignInLoading(false);
            toast.error(err.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
        setSignInLoading(false);
      });
  };

  return (
    <div className="p-5 signin">
      <section className="grid md:grid-cols-2 lg:grid-cols-2 items-center gap-4">
        {/* images */}
        <div className="w-full">
          <img src={signIn_image} alt="signupsvg" />
        </div>
        {/* images */}

        {/* form */}
        <div className="p-5 rounded-lg border">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="">Welcome Back</h1>
            <p className="text-sm">Enter Your Credentials to Sign In </p>

            {/* email field */}
            <label className="form-control w-full">
              <div className="label">
                <span className="sign_up_input_title">Your Email</span>
              </div>
              <input
                type="email"
                {...register("email")}
                placeholder="johndoe@gmail.com"
                required
              />
            </label>
            {/* email field */}

            {/* password field */}
            <label className="form-control w-full py-3 ">
              <div className="label">
                <span className="sign_up_input_title">Your password</span>
              </div>
              <div className="relative">
                <input
                  type={open ? "text" : "password"}
                  {...register("password")}
                  placeholder="*************"
                  required
                />
                <span
                  onClick={() => setOpen(!open)}
                  className="absolute top-[18px] right-4 cursor-pointer"
                >
                  {" "}
                  {open ? (
                    <IoEyeOutline className="text-xl" />
                  ) : (
                    <FaEyeSlash className="text-xl" />
                  )}
                </span>
              </div>
            </label>
            {/* password field */}
            <div className="form-control w-full">
              <button className="nbtn">
                {signInLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
          <div className="divider ">OR</div>

          {/** Social Media Login System */}
          <Social_Media
            setGoogleLoading={setGoogleLoading}
            googleLoading={googleLoading}
          >
            {" "}
          </Social_Media>

          <div className="text-center py-3">
            <p className="text-sm text-gray-700 font-medium">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        {/* form */}
      </section>
    </div>
  );
};

export default Signin;
