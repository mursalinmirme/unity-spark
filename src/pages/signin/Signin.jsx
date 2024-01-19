/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import google_Icon from "../../assets/images/google-icon.png";
import { Link } from "react-router-dom";
import signIn_image from "../../assets/SignIn/signin.png";
const Signin = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log("form data", data);
  };
  return (
    <div className="p-5 lg:w-[1200px] mx-auto ">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* images */}
        <div className="w-full items-center hidden lg:flex">
          <img
            className="w-full"
            src={signIn_image}
            alt="signupsvg"
          />
        </div>
        {/* images */}

        {/* form */}
        <div className="p-3 md:p-8 rounded-lg border border-slate-300">
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="text-center space-y-3">
              <h1 className="text-2xl font-semibold text-[#000]">
                Welcome Back
              </h1>
              <p className="font-medium text-[#000]">
                Enter Your Credentials to Sign In{" "}
              </p>
            </span>

            {/* email field */}
            <label className="form-control w-full mx-auto mt-3">
              <div className="label">
                <span className="font-medium">Your Email</span>
              </div>
              <input
                type="email"
                {...register("email")}
                placeholder="johndoe@gmail.com"
                className="input input-bordered w-full"
                required
              />
            </label>
            {/* email field */}

            {/* password field */}
            <label className="form-control w-full mx-auto mt-2">
              <div className="label">
                <span className="font-medium">Your password</span>
              </div>
              <input
                type="url"
                {...register("pass")}
                placeholder="************"
                className="input input-bordered w-full"
                required
              />
            </label>
            {/* password field */}
            <div className="form-control w-full mx-auto py-5">
              <button className="text-base">Sign In</button>
            </div>
          </form>
          <h1 className="text-center text-gray-700 font-medium mb-2">Or</h1>
          <div className="flex justify-center">
            <span className="border-2 border-primary text-primary cursor-pointer px-3 py-2.5 rounded-xl w-full flex items-center justify-center gap-2 font-medium">
              <span>
                <img className="h-5" src={google_Icon} alt="Google" />
              </span>
              Sign Up With Google
            </span>
          </div>
          <div className="text-center py-3">
            <p className="text-gray-700 font-medium">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
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
