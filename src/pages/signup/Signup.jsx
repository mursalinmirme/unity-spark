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
    <div className="p-5">
      <section className="grid md:grid-cols-2 lg:grid-cols-2 ">
        {/* form */}
        <div className="border-2 border-red-500 w-full mx-auto p-8 rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="text-center space-y-3">
              <h1 className="text-2xl  font-semibold pt-2">Sign Up</h1>
              <p className="font-light text-gray-500 text-sm">
                Create Your Account
              </p>
            </span>
            {/* name field */}
            <label className="form-control w-full max-w-xs mx-auto">
              <div className="label">
                <span className="label-text">What is your name?</span>
              </div>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="John Doe"
                className="input input-bordered w-full"
                required
              />
            </label>
            {/* name field */}
            {/* email field */}
            <label className="form-control w-full max-w-xs mx-auto">
              <div className="label">
                <span className="label-text">What is your email?</span>
              </div>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="johndoe@gmail.com"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>
            {/* email field */}
            {/*image field */}
            <label className="form-control w-full max-w-xs mx-auto">
              <div className="label">
                <span className="label-text">Upload your image link</span>
              </div>
              <input
                type="file"
                {...register("photo", { required: true })}
                placeholder="https://image.one"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>
            {/* image field */}
            {/* password field */}
            <label className="form-control w-full max-w-xs mx-auto">
              <div className="label">
                <span className="label-text">Type your password</span>
              </div>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="************"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>
            {/* password field */}
            <div className="form-control w-full max-w-xs mx-auto py-3">
              <button>Sign Up</button>
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
        <div className="flex items-center">
          <img className="h-96" src={img} alt="signupsvg" />
        </div>
        {/* images */}
      </section>
    </div>
  );
};

export default Signup;
