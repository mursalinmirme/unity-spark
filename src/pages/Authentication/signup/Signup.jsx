import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { SlCloudUpload, SlEnergy } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "../../../Provider/AuthProvider";
import bg2 from "../../../assets/SignIn/signin-2.jpg";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useRandomPasswordGenerate from "../../../hooks/useRandomPasswordGenerate";
import Social_Media from "../../components/Share/Social_Media/Social_Media";
import "../authentication.css";

const image_Hosting_Api = import.meta.env.VITE_image_Hosting_Api;
const Signup = () => {
  const PublicAxios = useAxiosPublic();
  const { newUserCreate, userUpdateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [randomPassword, generatePassword] = useRandomPasswordGenerate();
  const [secret, setSecret] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    setSignUpLoading(true);
    if (data.photo.length === 0) {
      toast.error("Please select your photo");
      setSignUpLoading(false);
      return;
    }
    if (data.password !== data.confirm) {
      toast.error(`Your passwrod doesn't Match`);
      setSignUpLoading(false);
      return;
    }
    const imageFile = { image: data.photo[0] };
    const res = await axios.post(image_Hosting_Api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // firebase sign up
      newUserCreate(data?.email, data?.password)
        .then(() => {
          // update name and photo in firebase
          userUpdateProfile(data.name, res.data.data.display_url)
            .then(() => {
              // make new users object
              const newUser = {
                name: data?.name,
                email: data?.email,
                image: res.data.data.display_url,
              };
              // post users info in database
              PublicAxios.post("/users", newUser)
                .then(() => {
                  setSignUpLoading(false);
                  //The navigate path will change when dashboard will complete
                  navigate("/");
                  toast.success("Your Registration successfully");
                })
                .catch((err) => {
                  toast.error(err.message);
                  setSignUpLoading(false);
                });
            })
            .catch((error) => {
              console.log(error.message);
              setSignUpLoading(false);
            });
        })
        .catch((error) => {
          toast.error(error.message);
          setSignUpLoading(false);
        });
    }
  };

  const signInBg = {
    background: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0)), url(${bg2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div className="signin lg:min-h-[70vh]" style={signInBg}>
      <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-1 items-center lg:min-h-[70vh]">
        {/* images */}
        <div className="2xl:hidden"></div>
        {/* form */}
        <div className="bg-white  w-full 2xl:w-[650px] 2xl:mx-auto lg:rounded-s-2xl 2xl:rounded-2xl">
          <div>
            <div className="p-6 md:12 h-full rounded-2xl w-full lg:max-w-[650px]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Lets Start a new journey</h1>
                <p>Create Your Account</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* name field */}
                  <div>
                    <label>
                      <div className="label">
                        <span className="sign_up_input_title">
                          What is your name?
                        </span>
                      </div>
                      <input
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="John Doe"
                        required
                      />
                    </label>
                  </div>
                  {/*image field */}
                  <label className="relative">
                    <div className="label mb-8 md:mb-0 lg:mb-0">
                      <span className="user_profile_input_title pb-4 md:pb-0 md:mb-10 lg:mb-10 ">
                        {" "}
                        Your Photo{" "}
                      </span>
                      <label
                        className="font-semibold w-full absolute bottom-0 text-white cursor-pointer font-inter text-base px-8 py-2.5 bg-primary rounded-md transition-all duration-500 mt-1 mb-0.5"
                        htmlFor="user_photo"
                      >
                        <div className="flex justify-center items-center gap-4">
                          {" "}
                          {/* <img className="w-5 h-5" src={download_icon} alt="" />{" "} */}
                          <SlCloudUpload className="w-5 h-5" />
                          <span> Upload Photo</span>{" "}
                        </div>
                      </label>
                    </div>
                    <input
                      className="hidden"
                      id="user_photo"
                      type="file"
                      {...register("photo")}
                      placeholder="Add Image"
                    />
                  </label>
                  {/* image field */}
                </div>

                {/* name field */}
                {/* email field */}
                <label>
                  <div className="label">
                    <span className="sign_up_input_title">
                      What is your email?
                    </span>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <label>
                    <div className="label">
                      <span className="sign_up_input_title">Your password</span>
                    </div>

                    <div className="relative">
                      <input
                        value={randomPassword}
                        type={open ? "text" : "password"}
                        {...register("password", { required: true })}
                        placeholder="Create Password"
                      />
                      <span
                        onClick={() => setOpen(!open)}
                        className="absolute top-[18px] right-3 cursor-pointer"
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
                  <label>
                    <div className="label">
                      <span className="sign_up_input_title">
                        Confirm Password
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        value={randomPassword}
                        type={secret ? "text" : "password"}
                        {...register("confirm", { required: true })}
                        placeholder="Create Password"
                      />
                      <span
                        onClick={() => setSecret(!secret)}
                        className="absolute top-[18px] right-3 cursor-pointer"
                      >
                        {" "}
                        {secret ? (
                          <IoEyeOutline className="text-xl" />
                        ) : (
                          <FaEyeSlash className="text-xl" />
                        )}
                      </span>
                    </div>
                  </label>
                </div>

                {/* PassWord Random Generator Btn */}
                <button
                  className="nbtn bg-green-600 my-5"
                  onClick={generatePassword}
                >
                  <div className="flex items-center gap-3">
                    <SlEnergy />
                    <span> Password Generator</span>
                  </div>
                </button>

                {/* password field */}
                <div className="form-control w-full">
                  <button className="text-base flex justify-center items-center nbtn">
                    {signUpLoading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </form>
              <div className="divider">OR</div>
              {/** Social Media SignUp System */}
              <Social_Media
                setGoogleLoading={setGoogleLoading}
                googleLoading={googleLoading}
              ></Social_Media>

              <div className="text-center py-3">
                <p className="text-sm text-gray-700 font-medium">
                  Already Have an account?{" "}
                  <Link to="/signin" className="text-primary">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* form */}
      </section>
    </div>
  );
};

export default Signup;
