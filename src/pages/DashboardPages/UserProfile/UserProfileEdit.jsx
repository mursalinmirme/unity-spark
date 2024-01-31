import { useContext, useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Controller, useForm } from "react-hook-form";
import download_icon from "../../../assets/images/download-Icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;
const UserProfileEdit = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  // New Array
  const skillsArray = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React.js" },
    { value: "HTML", label: "HTML" },
    { value: "Next", label: "Next.js" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "MySQL", label: "MySQL" },
    { value: "Mongoose", label: "Mongoose" },
  ];

  const [users, setUsers] = useState(null);
  // User Data Get
  useEffect(() => {
    axiosPublic.get(`/users/${user?.email}`).then((res) => {
      setUsers(res?.data);
    });
  }, [user?.email, setUsers, axiosPublic]);

  // Form Summit
  const onSubmit = async (data) => {
    console.log(data);

    let photos = users?.image;

    if (data?.photo?.length > 0) {
      const imageFile = { image: data.photo[0] };
      const res = await axios.post(image_Hosting_Api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      photos = res?.data?.data?.display_url;
    }
    // Info
    const userInfo = {
      name: data?.name || users?.name,
      email: user?.email,
      phone: data?.number || users?.phone,
      age: data?.age || users?.age,
      gender: data?.gender || users?.gender,
      current_address: data?.current || users?.current_address,
      permanent_address: data?.permanent || users?.permanent_address,
      institute_name: data?.institute_name || users?.institute_name,
      education_level: data?.education_level || users?.education_level,
      job_preference: data?.preference || users?.job_preference,
      time_preference: data?.time_preference || users?.time_preference,
      skills: data?.skills || users.skills,
      image: photos || users?.image,
      resume_link: data.resume || users?.resume_link,
    };

    console.log(userInfo);
    console.log(users);

    // http://localhost:5000/users/${user?.email

    axiosPublic
      .put(`/users/${user?.email}`, userInfo)
      .then((res) => {
        console.log(res?.data);
        toast.success("User Profile Update Successfully");
        navigate("/dashboard/userProfile");

        reset();
      })

      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <div className="user_profile_container">
        {users?.image ? (
          <img src={users?.image} alt="profile" />
        ) : (
          <CgProfile className="text-3xl" />
        )}
        <div className="flex justify-between w-full items-center">
          <div>
            <h2>{users?.name}</h2>
            <h3>{users?.email}</h3>
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
              className="edit_btn !border-red-600 hover:!border-primary">
              <span className="text-red-500 hover:text-white"> X Cancel </span>
            </Link>
          </div>
        </div>
      </div>

      {/** Form Start  */}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        {/**One Two Part */}
        <div className="grid md:grid-cols-2 gap-3">
          {/* name field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> Your Name :</span>
            </div>
            <input
              type="text"
              {...register("name")}
              placeholder="Please Your Name"
              defaultValue={users?.name}
            />
          </label>
          {/* Name field End */}

          {/*image field */}
          <label className="relative">
            <div className="label mb-10 md:mb-0 lg:mb-0">
              <span className="font-bold font-inter"> Your Photo : </span>
              <label
                className="font-semibold w-full absolute bottom-0    text-white cursor-pointer font-inter text-base px-8 py-[8px] bg-primary rounded-xl transition-all duration-500 text-[15px]"
                htmlFor="user_photo">
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
            <div className="py-1">
              <span className="font-bold font-inter"> Your Email :</span>
            </div>
            <input
              type="email"
              {...register("email")}
              placeholder="Your Email"
              readOnly
              defaultValue={users?.email}
            />
          </label>
          {/* email field End */}

          {/* phone Number*/}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter">Phone :</span>
            </div>
            <input
              type="number"
              {...register("number")}
              placeholder="Your Phone Number"
              defaultValue={users?.phone}
            />
          </label>
        </div>

        {/**Second Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Current Address field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter">
                {" "}
                Your Current Address:
              </span>
            </div>
            <input
              type="text"
              {...register("current")}
              placeholder="Your Current Address"
              defaultValue={users?.current_address}
            />
          </label>
          {/* Current Address field End */}

          {/* Permanent Address */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter">Permanent Address</span>
            </div>
            <input
              type="text"
              {...register("permanent")}
              placeholder=" Your Permanent Address"
              defaultValue={users?.permanent_address}
            />
          </label>
        </div>

        {/**Three Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Age field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> Your Age</span>
            </div>
            <input
              type="number"
              {...register("age")}
              placeholder="Your Age"
              defaultValue={users?.age}
            />
          </label>
          {/* Age field End */}

          {/* Your Gender Select */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> Your Gender :</span>
            </div>
            <input
              type="text"
              {...register("gender")}
              placeholder="Male"
              defaultValue={users?.gender}
            />
          </label>
        </div>

        {/**Four Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Job Preference field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter">
                {" "}
                Your Education Level :
              </span>
            </div>
            <input
              type="text"
              {...register("education_level")}
              placeholder="Eduction Level"
              defaultValue={users?.education_level}
            />
          </label>
          {/* Preference field End */}

          {/* Time Preference field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> Your Institute Name</span>
            </div>
            <input
              type="text"
              {...register("institute_name")}
              placeholder="Please Institute Name"
              defaultValue={users?.institute_name}
            />
          </label>
        </div>

        {/**five Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Job Preference field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter">
                {" "}
                Your Job Preference :
              </span>
            </div>
            <input
              type="text"
              {...register("preference")}
              placeholder="Remote"
              defaultValue={users?.job_preference}
            />
          </label>
          {/* Preference field End */}

          {/* Time Preference field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter">
                {" "}
                Your Time Preference
              </span>
            </div>
            <input
              type="text"
              {...register("time_preference")}
              placeholder="Intern"
              defaultValue={users?.time_preference}
            />
          </label>
        </div>

        {/**six Two Part */}

        {/* Skills field */}
        <label>
          <div className="py-1">
            <span className="font-bold font-inter"> Your Skills :</span>
          </div>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <Select {...field} options={skillsArray} isMulti />
            )}
          />
        </label>

        {/* Resume field */}
        <label>
          <div className="py-1">
            <span className="font-bold font-inter">Your Resume</span>
          </div>
          <input
            type="text"
            {...register("resume")}
            placeholder="Please share your resume drive link"
            defaultValue={users?.resume_link}
          />
        </label>

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
              {...register("resume")}
              placeholder="N/A"
              required
            />
          </label>
        </div> */}

        <div className="w-48 mt-10 bg-primary border-none text-white rounded-xl">
          <input className="cursor-pointer" type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
};

export default UserProfileEdit;
