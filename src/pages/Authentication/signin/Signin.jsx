/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import google_Icon from "../../../assets/images/google-icon.png";
import { Link } from "react-router-dom";
import signIn_image from "../../../assets/SignIn/signin.png";

const Signin = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("form data", data);
  };

  return (
    <div className="signin p-8">
      <section>

        {/* images */}
        <div className="left_container">
          <img
            className="w-full"
            src={signIn_image}
            alt="signupsvg"
          />
        </div>
        {/* images */}

        {/* form */}
        <div className="right_container">
          <form onSubmit={handleSubmit(onSubmit)}>            
            <h1>Welcome Back</h1>
            <p>Enter Your Credentials to Sign In</p>

            {/* email field */}
            <label>
              <div className="label">
                <span className="font-medium">Your Email</span>
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
            <label>
              <div className="label">
                <span className="font-medium">Your password</span>
              </div>
              <input
                type="url"
                {...register("pass")}
                placeholder="************"
                required
              />
            </label>
            {/* password field */}
            <div className="form_btn">
              <button className="text-base">Sign In</button>
            </div>
          </form>
          <h5>Or</h5>
          <div className="google_btn">
            <span>
              <img className="h-5" src={google_Icon} alt="Google" />
            </span>
            Sign Up With Google
          </div>
          <div>
            <p>
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
