import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import img from "../../../assets/images/signup.png";
import google_Icon from "../../../assets/images/google-icon.png";
import '../authentication.css'

const Signup = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("form data", data);
  };

  return (
    <div className="signup p-8">
      <section>
        {/* form */}
        <div className="left_container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Sign Up</h1>
            <p>Create Your Account</p>
            {/* name field */}
            <label>
              <div className="label">
                <span className="font-medium">What is your name?</span>
              </div>
              <input
                type="text"
                {...register("name")}
                placeholder="John Doe"
                required
              />
            </label>
            {/* name field */}
            {/* email field */}
            <label>
              <div className="label">
                <span className="font-medium">What is your email?</span>
              </div>
              <input
                type="email"
                {...register("email")}
                placeholder="johndoe@gmail.com"
                required
              />
            </label>
            {/* email field */}
            {/*image field */}
            <label>
              <div className="label">
                <span className="font-medium">Upload your image link</span>
              </div>
              <input
                type="url"
                {...register("img")}
                placeholder="https://image.one"
                required
              />
            </label>
            {/* image field */}
            {/* password field */}
            <label>
              <div className="label">
                <span className="font-medium">Type your password</span>
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
              <button className="text-base">Sign Up</button>
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
              Already Have an account?
              <Link to="/signin" className="text-primary ml-1 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
        {/* form */}

        {/* images */}
        <div className="right_container">
          <img className="w-full" src={img} alt="signup" />
        </div>
        {/* images */}
      </section>
    </div>
  );
};

export default Signup;
