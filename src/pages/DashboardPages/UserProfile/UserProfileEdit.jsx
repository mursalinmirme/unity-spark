import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useForm } from "react-hook-form";
import download_icon from "../../../assets/images/download-Icon.png";
import { Link } from "react-router-dom";
import axios from "axios";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;
const UserProfileEdit = () => {
  const { register, handleSubmit } = useForm();
  const [count, setCount] = useState(0);

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.photo[0] };
    const res = await axios.post(image_Hosting_Api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const userInfo = {
        name: data?.name,
        email: data?.email,
        phone: data?.number,
        age: data?.age,
        gender: data?.gender,
        current_Address: data?.current,
        permanent_Address: data?.permanent,
        job_preference: data?.preference,
        time_preference: data?.time_preference,
        skills: data?.skills,
        image: res.data.data.display_url,
      };
      console.log("checked", userInfo);
    }
  };
  return (
    <div>
      <div className="user_profile_container">
        <img src="https://i.ibb.co/vcBNZ2H/founder-1.jpg" alt="profile" />
        <div className="flex justify-between w-full">
          <div>
            <h2>John Doe</h2>
            <h3>johndoetheheroalom@gmail.com</h3>
            <ProgressBar
              completed={90}
              bgColor="#433ebe"
              height="12px"
              baseBgColor="#e3e2f5"
              labelColor="#ffffff"
              labelSize="10px"
              maxCompleted={100}
              animateOnRender
            />
          </div>
          <div>
            <Link
              to="/dashboard/userProfile"
              className="edit_btn !border-red-600 hover:!border-primary"
            >
              <span className="text-red-500 hover:text-white "> X Cancel </span>
            </Link>
          </div>
        </div>
      </div>

      {/** Form Start  */}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        {/**One Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* name field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter"> Your Name :</span>
            </div>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Please Your Name"
              required
            />
          </label>
          {/* Name field End */}

          {/*image field */}
          <label className="relative">
            <div className="label">
              <span className="font-bold font-inter"> Your Photo : </span>
              <label
                className="font-semibold w-full absolute bottom-0   text-white cursor-pointer font-inter text-base px-8 py-[8px] bg-primary rounded-xl transition-all duration-500 text-[15px]"
                htmlFor="user_photo"
              >
                <div className="flex justify-center gap-2">
                  {" "}
                  <img src={download_icon} alt="" /> <span> Upload Photo</span>{" "}
                </div>
              </label>
            </div>
            <input
              className="hidden"
              id="user_photo"
              type="file"
              {...register("photo")}
              placeholder="N/A"
            />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          {/* Email field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter"> Your Email :</span>
            </div>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Your Email"
              required
            />
          </label>
          {/* email field End */}

          {/* phone Number*/}
          <label>
            <div className="label">
              <span className="font-bold font-inter">Phone :</span>
            </div>
            <input
              type="number"
              {...register("number", { required: true })}
              placeholder="Your Phone Number"
              required
            />
          </label>
        </div>

        {/**Second Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Current Address field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">
                {" "}
                Your Current Address:
              </span>
            </div>
            <input
              type="address"
              {...register("current", { required: true })}
              placeholder=" Your Current Address "
              required
            />
          </label>
          {/* Current Address field End */}

          {/* Permanent Address */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">Permanent Address</span>
            </div>
            <input
              type="address"
              {...register("permanent", { required: true })}
              placeholder=" Your Permanent Address"
              required
            />
          </label>
        </div>

        {/**Three Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Age field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter"> Your Age</span>
            </div>
            <input
              type="age"
              {...register("age", { required: true })}
              placeholder="Your Age"
              required
            />
          </label>
          {/* Age field End */}

          {/* Your Gender Select */}
          <label>
            <div className="label">
              <span className="font-bold font-inter"> Your Gender :</span>
            </div>
            <input
              type="text"
              {...register("gender", { required: true })}
              placeholder="Male"
              required
            />
          </label>
        </div>

        {/**Four Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Job Preference field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">
                {" "}
                Your Job Preference :
              </span>
            </div>
            <input
              type="text"
              {...register("preference", { required: true })}
              placeholder="Remote"
              required
            />
          </label>
          {/* Preference field End */}

          {/* Time Preference field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">
                {" "}
                Your Time Preference
              </span>
            </div>
            <input
              type="text"
              {...register("time_preference", { required: true })}
              placeholder="Intern"
              required
            />
          </label>
        </div>

        {/**Five Two Part */}

        <div className="gap-2">
          {/* Skills field */}
          {/* <label>
            <div className="label">
              <span className="font-bold font-inter"> Your Skills :</span>
            </div>
            <input
              type="text"
              {...register("skills", { required: true })}
              placeholder="Your Skills Write Now"
              required
            />
          </label> */}
          {/* Skills field End */}
        </div>

        {/* Resume field */}
        {/* <div className="mt-5">
          <label className="relative ">
            <div className="label">
              <span className="font-bold font-inter"> Your Resume : </span>
              <label
                className="font-semibold absolute w-64 mt-24 lg:bottom-0 text-white cursor-pointer font-inter text-base px-8  py-[8px] bg-primary rounded-xl transition-all duration-500 text-[15px]"
                htmlFor="user_Resume"
              >
                <div className="flex justify-start gap-2">
                  <img src={download_icon} alt="" /> <span> Upload Resume</span>
                </div>
              </label>
            </div>
            <input
              className="hidden"
              id="user_Resume"
              type="file"
              {...register("resume", { required: true })}
              placeholder="N/A"
              required
            />
          </label>
        </div> */}

        <div className="w-48 mx-auto mt-20  lg:mt-4  bg-primary border-none text-white rounded-xl">
          <input className="cursor-pointer" type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
};

export default UserProfileEdit;
