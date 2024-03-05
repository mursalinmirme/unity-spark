import ProgressBar from "@ramonak/react-progress-bar";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CgProfile } from "react-icons/cg";
import { SlCloudUpload } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "sonner";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserProfileEditSkeleton from "./UserProfileEditSkeleton";
const image_Hosting_Api = import.meta.env.VITE_image_Hosting_Api;
const UserProfileEdit = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const [updateLoading, setUpdateLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { profileComplete } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
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

  const { data: users, isFetching } = useQuery({
    queryKey: ["userAllInformations"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/${user?.email}`);
      return result.data;
    },
  });

  // Form Summit
  const onSubmit = async (data) => {
    console.log("check", data);

    setUpdateLoading(true);

    let photos = users?.image;

    if (data?.photo?.length > 0) {
      const imageFile = { image: data.photo[0] };
      const res = await axiosPublic.post(image_Hosting_Api, imageFile, {
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

    axiosSecure
      .put(`/users/${user?.email}`, userInfo)
      .then((res) => {
        console.log(res?.data);
        setUpdateLoading(false);
        toast.success("User Profile Update Successfully");
        navigate("/dashboard/user-profile");

        reset();
      })

      .catch((error) => {
        console.log(error.message);
      });
  };

  if (isFetching) {
    return <UserProfileEditSkeleton></UserProfileEditSkeleton>;
  }

  return (
    <div>
      <div className="user_profile_container">
        {users?.image ? (
          <img src={users?.image} alt="profile" />
        ) : (
          <CgProfile className="text-3xl" />
        )}
        <div className="flex flex-col md:flex-row justify-between w-full md:items-center">
          <div>
            <h2>{users?.name}</h2>
            <h3>{users?.email}</h3>
            <ProgressBar
              completed={Math.ceil(profileComplete)}
              bgColor="#433ebe"
              height="12px"
              width="300px"
              baseBgColor="#e3e2f5"
              labelColor="#ffffff"
              labelSize="10px"
              maxCompleted={100}
              animateOnRender
            />
          </div>
          <div className="mt-3 md:mt-0 w-24 md:w-auto">
            <Link
              to="/dashboard/user-profile"
              className="edit_btn !text-red-500 hover:!text-white !border-red-600 hover:!border-red-600 hover:!bg-red-600"
            >
              <span> X Cancel </span>
            </Link>
          </div>
        </div>
      </div>

      {/** Form Start  */}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <div className="border-2 p-3 md:p-5 rounded-lg space-y-2.5 mb-2.5">
          {/**One Two Part */}
          <div className="user_profile_input_grid">
            {/* name field */}
            <label>
              <div className="py-1">
                <span className="user_profile_input_title"> Your Name :</span>
              </div>
              <input
                type="text"
                {...register("name")}
                placeholder="Please Your Name"
                defaultValue={users?.name}
                className="user_profile_input"
              />
            </label>
            {/* Name field End */}

            {/*image field to take image*/}
            <label className="relative">
              <div className="label mb-10 md:mb-0 lg:mb-0 py-1">
                <span className="user_profile_input_title pb-4 md:pb-0 md:mb-10 lg:mb-10 ">
                  {" "}
                  Your Photo :{" "}
                </span>
                <label
                  className="font-semibold w-full absolute bottom-0 text-white cursor-pointer font-inter text-base px-8 py-2 bg-primary rounded-md transition-all duration-500 mt-1 mb-0.5"
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
                placeholder="N/A"
              />
            </label>
          </div>

          <div className="user_profile_input_grid">
            {/* Email field */}
            <label>
              <div className="py-1">
                <span className="user_profile_input_title"> Your Email :</span>
              </div>
              <input
                type="email"
                {...register("email")}
                placeholder="Your Email"
                readOnly
                defaultValue={users?.email}
                className="user_profile_input"
              />
            </label>
            {/* email field End */}

            {/* phone Number*/}
            <label>
              <div className="py-1">
                <span className="user_profile_input_title">Phone :</span>
              </div>
              <input
                type="number"
                {...register("number")}
                placeholder="Your Phone Number"
                defaultValue={users?.phone}
                className="user_profile_input"
              />
            </label>
          </div>

          {/**Second Two Part */}
          <div className="user_profile_input_grid">
            {/* Current Address field */}
            <label>
              <div className="py-1">
                <span className="user_profile_input_title">
                  {" "}
                  Current Address:
                </span>
              </div>
              <input
                type="text"
                {...register("current")}
                placeholder="Your Current Address"
                defaultValue={users?.current_address}
                className="user_profile_input"
              />
            </label>
            {/* Current Address field End */}

            {/* Permanent Address */}
            <label>
              <div className="py-1">
                <span className="user_profile_input_title">
                  Permanent Address
                </span>
              </div>
              <input
                type="text"
                {...register("permanent")}
                placeholder=" Your Permanent Address"
                defaultValue={users?.permanent_address}
                className="user_profile_input"
              />
            </label>
          </div>

          {/**Three Two Part */}
          <div className="user_profile_input_grid">
            {/* Age field */}
            <label>
              <div className="py-1">
                <span className="user_profile_input_title"> Your Age</span>
              </div>
              <input
                type="number"
                {...register("age")}
                placeholder="Your Age"
                defaultValue={users?.age}
                className="user_profile_input"
              />
            </label>
            {/* Age field End */}

            {/* Your Gender Select */}
            <label>
              <div className="py-1">
                <span className="user_profile_input_title"> Your Gender :</span>
              </div>

              <select
                className="w-full mt-1.5 pl-2 rounded-md user_profile_input"
                {...register("gender")}
              >
                <option className="text-base"> {users?.gender} </option>
                <option className="text-base" value="male">
                  Male
                </option>
                <option className="text-base" value="female">
                  Female
                </option>
              </select>
            </label>
          </div>

          {/**Four Two Part */}
          <div className="user_profile_input_grid">
            {/* Job Preference field */}
            <label>
              <div className="py-1">
                <span className="user_profile_input_title">
                  {" "}
                  Education Level :
                </span>
              </div>
              <input
                type="text"
                {...register("education_level")}
                placeholder="Eduction Level"
                defaultValue={users?.education_level}
                className="user_profile_input"
              />
            </label>
            {/* Preference field End */}

            {/* Time Preference field */}
            <label>
              <div className="py-1">
                <span className="user_profile_input_title">
                  {" "}
                  Institute Name
                </span>
              </div>
              <input
                type="text"
                {...register("institute_name")}
                placeholder="Please Institute Name"
                defaultValue={users?.institute_name}
                className="user_profile_input"
              />
            </label>
          </div>

          {/**five Two Part */}
          <div className="user_profile_input_grid">
            {/* Job Preference field */}
            <label>
              <div className="py-1">
                <span className="user_profile_input_title">
                  {" "}
                  Job Preference :
                </span>
              </div>

              <select
                className="w-full mt-2 rounded-md pl-2 user_profile_input"
                {...register("preference")}
              >
                <option> {users?.job_preference} </option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid </option>
              </select>
            </label>
            {/* Preference field End */}

            {/* Time Preference field */}
            <label>
              <div className="py-1">
                <span className="user_profile_input_title">
                  {" "}
                  Time Preference
                </span>
              </div>

              <select
                className="w-full mt-2 rounded-md pl-2 user_profile_input"
                {...register("time_preference")}
              >
                <option> {users?.time_preference} </option>
                <option value="intern">intern</option>
                <option value="full-time">full-time</option>
                <option value="part-time">part-time</option>
              </select>
            </label>
          </div>

          {/**six Two Part */}

          {/* Skills field */}
          <div className="">
            <label className="text-sm font-medium">
              <div className="py-1">
                <span className="user_profile_input_title"> Your Skills :</span>
              </div>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={skillsArray}
                    defaultValue={users?.skills}
                    isMulti
                  />
                )}
              />
            </label>
          </div>

          {/* Resume field */}
          <div>
            <label className="">
              <div className="py-1">
                <span className="user_profile_input_title">Your Resume</span>
              </div>
              <input
                className="user_profile_input"
                id="user_Resume"
                type="text"
                {...register("resume")}
                placeholder="Please share your resume drive link"
                defaultValue={users?.resume_link}
              />
            </label>
          </div>
        </div>

        <div className="">
          {updateLoading ? (
            <span className="loading loading-spinner loading-md "></span>
          ) : (
            <button className="nbtn-fixed-bg w-36" type="submit">
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfileEdit;
