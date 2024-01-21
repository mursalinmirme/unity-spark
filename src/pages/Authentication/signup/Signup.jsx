import { useForm } from "react-hook-form";
import "../authentication.css";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../assets/images/signUps.png";
import download_icon from "../../../assets/images/download-Icon.png";
import { useContext, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";
import Social_Media from "../../components/Share/Social_Media/Social_Media";
import axios from "axios";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;
const Signup = () => {
  const { newUserCreate, userUpdateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [secret, setSecret] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.photo[0] };
    const res = await axios.post(image_Hosting_Api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // if(data.password === data?.confirm){
      //   return
      // }

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
        <div className="left_container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Lets Start a new journey</h1>
            <p>Create Your Account</p>

            <div className="grid grid-cols-2 gap-2">
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

              {/*image field */}
              <div className="mt-4">
                <span className="font-medium ml-1">Your Photo</span>
                <label
                  className="font-semibold text-white cursor-pointer font-inter text-base px-4  sm:py-[4px] md:py-[12px] bg-primary rounded-xl transition-all duration-500 text-[15px]"
                  htmlFor="user_photo"
                >
                  <div className="flex justify-center ">
                    {" "}
                    <img src={download_icon} alt="" />{" "}
                    <span> Upload Your Photo</span>{" "}
                  </div>
                </label>
                <input
                  className="hidden"
                  id="user_photo"
                  type="file"
                  {...register("photo", { required: true })}
                  placeholder="add Image"
                  required
                />
              </div>

              {/* image field */}
            </div>

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

            {/* password field */}

            <div className="grid grid-cols-2 gap-4">
              <label>
                <div className="label">
                  <span className="font-medium">Your password</span>
                </div>

                <div className="relative">
                  <input
                    type={open ? "text" : "password"}
                    {...register("password", { required: true })}
                    placeholder="Create Password"
                    required
                  />
                  <span
                    onClick={() => setOpen(!open)}
                    className="absolute top-[13px] right-3 cursor-pointer"
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

              <label>
                <div className="label">
                  <span className="font-medium">Confirm Password</span>
                </div>
                <div className="relative">
                  <input
                    type={secret ? "text" : "password"}
                    {...register("confirm", { required: true })}
                    placeholder="Create Password"
                    required
                  />
                  <span
                    onClick={() => setSecret(!secret)}
                    className="absolute top-[13px] right-3 cursor-pointer"
                  >
                    {" "}
                    {secret ? (
                      <IoEyeOutline className="text-2xl" />
                    ) : (
                      <FaEyeSlash className="text-2xl" />
                    )}
                  </span>
                </div>
              </label>
            </div>
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
