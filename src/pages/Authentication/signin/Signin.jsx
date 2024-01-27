/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import signIn_image from "../../../assets/images/signin.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";
import Social_Media from "../../components/Share/Social_Media/Social_Media";
import { IoEyeOutline } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
const Signin = () => {
  const { userSignIn } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setSignInLoading(true);
    // User Login Method
    userSignIn(data?.email, data?.password)
      .then((res) => {
        axios
          .get(
            `https://unity-spark-server.vercel.app/user-role?email=${res?.user?.email}`
          )
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
    <div className="p-5">
      <section className="grid md:grid-cols-2 lg:grid-cols-2 items-center gap-4">
        {/* images */}
        <div className="w-full">
          <img src={signIn_image} alt="signupsvg" />
        </div>
        {/* images */}

        {/* form */}
        <div className="p-5 rounded-lg  border">
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="text-center space-y-3">
              <h1 className="text-2xl font-semibold text-[#000]">
                Welcome Back
              </h1>
              <p className="font-inter text-sm text-[#000] font-semibold">
                Enter Your Credentials to Sign In{" "}
              </p>
            </span>

            {/* email field */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold font-inter">
                  Your Email
                </span>
              </div>
              <input
                type="email"
                {...register("email")}
                placeholder="johndoe@gmail.com"
                className="input input-bordered w-full mt-0"
                required
              />
            </label>
            {/* email field */}

            {/* password field */}
            <label className="form-control w-full py-3 ">
              <div className="label">
                <span className="label-text font-semibold font-inter">
                  Your password
                </span>
              </div>
              <div className="relative">
                <input
                  type={open ? "text" : "password"}
                  {...register("password")}
                  placeholder="************"
                  className="input input-bordered w-full mt-0"
                  required
                />
                <span
                  onClick={() => setOpen(!open)}
                  className="absolute top-3 right-4 cursor-pointer"
                >
                  {" "}
                  {open ? (
                    <IoEyeOutline className="text-2xl" />
                  ) : (
                    <FaEyeSlash className="text-2xl" />
                  )}
                </span>
              </div>
            </label>
            {/* password field */}
            <div className="form-control w-full py-3">
              <button className="text-base flex justify-center items-center">
                {signInLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
          <h1 className="text-center text-gray-700 font-medium">Or</h1>

          {/** Social Media Login System */}
          <Social_Media setSignInLoading={setSignInLoading}> </Social_Media>

          <div className="text-center py-3">
            <p className="text-sm text-gray-700 font-medium">
              Don't an account?{" "}
              <Link to="/signup" className="text-[#248479]">
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
