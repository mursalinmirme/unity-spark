import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/signup.png";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import Social_Media from "../Share/Social_Media/Social_Media";
import axios from "axios";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;
const Signup = () => {
  const { newUserCreate, userUpdateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.photo[0] };
    const res = await axios.post(image_Hosting_Api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      newUserCreate(data?.email, data?.password)
        .then((userInfo) => {
          console.log(userInfo?.user);
          toast.success("New User Create Successfully");

          // User Profile Update
          userUpdateProfile(data.name, res.data.data.display_url)
            .then((userInfo) => {
              console.log(userInfo);
              toast.success("User Profile Update Successfully");
              navigate("/");
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="signup p-8">
      <section>
        {/* form */}
        <div className="border-2 border-red-500 w-full mx-auto p-8 rounded-xl">
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
                {...register("name", { required: true })}
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
                {...register("email", { required: true })}
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
                type="file"
                {...register("photo", { required: true })}
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
                type="password"
                {...register("password", { required: true })}
                placeholder="************"
                required
              />
            </label>
            {/* password field */}
            <div className="form_btn">
              <button className="text-base">Sign Up</button>
            </div>
          </form>
          <h1 className="text-center text-gray-700 font-medium">Or</h1>

          {/** Social Media SignUp System */}
          <Social_Media></Social_Media>

          <div className="text-center py-3">
            <p className="text-sm text-gray-700 font-medium">
              Already Have an account?{" "}
              <Link to="/signin" className="text-[#248479]">
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
