/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import signIn_image from "../../assets/images/signIn-picture.png";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import Social_Media from "../Share/Social_Media/Social_Media";

const Signin = () => {
  const { userSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    // User Login Method
    userSignIn(data?.email, data?.password)
      .then((result) => {
        console.log(result.user);
        toast.success("User Login Successfully");

        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });

    reset();
  };

  return (
    <div className="p-5 lg:w-[1100px] mx-auto ">
      <section className="grid md:grid-cols-2 lg:grid-cols-2">
        {/* images */}
        <div className="w-full flex items-center">
          <img
            className="lg:ml-20  md:h-[350px]"
            src={signIn_image}
            alt="signupsvg"
          />
        </div>
        {/* images */}

        {/* form */}
        <div className="p-5 rounded-lg lg:mr-11 border-2 border-red-500">
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="text-center space-y-3">
              <h1 className="text-2xl font-semibold text-[#000]">
                Welcome Back
              </h1>
              <p className="font-light  text-sm text-[#000]">
                Enter Your Credentials to Sign In{" "}
              </p>
            </span>

            {/* email field */}
            <label className="form-control w-full max-w-xs mx-auto">
              <div className="label">
                <span className="label-text">Your Email</span>
              </div>
              <input
                type="email"
                {...register("email")}
                placeholder="johndoe@gmail.com"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>
            {/* email field */}

            {/* password field */}
            <label className="form-control w-full max-w-xs mx-auto">
              <div className="label">
                <span className="label-text">Your password</span>
              </div>
              <input
                type="password"
                {...register("password")}
                placeholder="************"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>
            {/* password field */}
            <div className="form-control w-full max-w-xs mx-auto py-3">
              <button>Sign In</button>
            </div>
          </form>
          <h1 className="text-center text-gray-700 font-medium">Or</h1>

          {/** Social Media Login System */}
          <Social_Media> </Social_Media>

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
