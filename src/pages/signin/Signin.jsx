/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import google_Icon from "../../assets/images/google-icon.png";
import { Link } from "react-router-dom";
import signIn_image from "../../assets/images/signIn-picture.png";
const Signin = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log("form data", data);
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
        <div className="p-5 rounded-lg lg:mr-11 ">
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
                type="url"
                {...register("pass")}
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
          <div className="flex justify-center">
            {" "}
            <span className="border btn-outline cursor-pointer border-green-400 px-3 py-1.5 rounded-md w-full max-w-xs flex items-center justify-center gap-2 text-sm">
              <span>
                <img className="h-5" src={google_Icon} alt="Google" />
              </span>{" "}
              Sign Up With Google
            </span>
          </div>
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
