import "../../DashboardPages/EmployeePages/MyProfile/profile.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUserInfo from "../../../hooks/useUserInfo";
import { LuDownload } from "react-icons/lu";
const UserProfile = () => {
  const { profileComplete } = useContext(AuthContext);
  const [users] = useUserInfo()
  const {name, image, email, skills, gender, age, current_address, permanent_address, institute_name, phone, resume_link, time_preference, job_preference, education_level} = users || {}

  console.log(users);
  return (
    <div>
      <div className="user_profile_container">
        {users?.image ? (
          <img src={image || 'https://i.ibb.co/sCWs3kS/user-3.png'} alt="profile" />
        ) : (
          <CgProfile className="text-3xl" />
        )}
        <div className="flex justify-between w-full">
          <div>
            <h2>{name || 'N/A'}</h2>
            <h3>{email || 'N/A'}</h3>
          </div>
          <div className="flex gap-3 items-center relative">
            {/* <div className="border-2 border-primary rounded-lg p-1 sm:hidden  md:hidden ">
              <img
                style={{ height: "18px", width: "18px" }}
                src={counter_icon}
                alt=""
              />
              <span className="bg-primary  w-5 h-5 absolute top-2 md:right-[112px] text-white flex items-center justify-center rounded-lg">
                7
              </span>
            </div> */}

            <Link
              to="/dashboard/userProfileEdit"
              className="flex gap-2 items-center text-primary font-inter font-semibold text-sm border-2 rounded-lg cursor-pointer border-primary py-1 px-3 hover:bg-primary hover:text-white transition-all duration-500"
            >
              <span>Edit Info</span>
              <FiEdit3 />
            </Link>
          </div>
        </div>
      </div>

      <h1 className="border-t border-gray-500 mt-5"></h1>
      <div className="mt-5">
        <div className="flex justify-between items-center mb-1.5 ">
          <h2 className="text-[22px] font-bold font-inter">
            Complete You Profile
          </h2>
          <h2> {Math.ceil(profileComplete)}% </h2>
        </div>
        <ProgressBar
          completed={profileComplete}
          bgColor="#433ebe"
          height="12px"
          baseBgColor="#e3e2f5"
          labelColor="#ffffff"
          labelSize="0px"
          maxCompleted={100}
          animateOnRender
        />
      </div>

      {/** Input Form Area  */}

      <div className="grid md:grid-cols-2 gap-2 mt-7">
        {/* Email field */}
        <label>
          <div className="label">
            <span className="font-semibold font-inter">Email :</span>
          </div>
          <p className="font-inter"> {email || 'N/A'} </p>
        </label>
        {/* email field End */}

        {/* phone Number*/}
        <label>
          <div className="label">
            <span className="font-semibold font-inter">Phone :</span>
          </div>
          <p className="font-inter"> {phone || 'N/A'} </p>
        </label>
      </div>

      {/**Second Two Part */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* Current Address field */}
        <label>
          <div className="label">
            <span className="font-semibold font-inter">Current Address :</span>
          </div>
          <p className="font-inter"> {current_address || "N/A"}</p>
        </label>
        {/* Current Address field End */}

        {/* Permanent Address */}
        <label>
          <div className="label">
            <span className="font-semibold font-inter">Permanent Address :</span>
          </div>

          <p className="font-inter">{permanent_address || "N/A"}</p>
        </label>
      </div>

      {/**Three Two Part */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* Age field */}
        <label>
          <div className="label">
            <span className="font-semibold font-inter">Age :</span>
          </div>
          <p className="font-inter"> {age || "N/A"} </p>
        </label>
        {/* Age field End */}

        {/* Your Gender Select */}
        <label>
          <div className="label">
            <span className="font-semibold font-inter">Gender :</span>
          </div>
          <p className="font-inter"> {gender || "N/A"} </p>
        </label>
      </div>

      {/**Four Two Part */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* name field */}
        <label>
          <div className="label">
            <span className="font-semibold font-inter">Education Level :</span>
          </div>
          <p className="font-inter">{education_level || 'N/A'}</p>
        </label>
        {/* Education field End */}

        {/* Institute Name field */}
        <label>
          <div className="label">
            <span className="font-semibold font-inter">Institute Name :</span>
          </div>
          <p className="font-inter">{institute_name || 'N/A'}</p>
        </label>
      </div>

      {/**five Two Part */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* Job Preference field */}
        <label>
          <div className="label">
            <span className="font-semibold font-inter">Job Preference :</span>
          </div>
          <p className="font-inter">{job_preference || "N/A"} </p>
        </label>
        {/* Preference field End */}

        {/* Time Preference field */}
        <label>
          <div className="label">
            <span className="font-semibold font-inter">Time Preference :</span>
          </div>

          <p className="font-inter"> {time_preference || "N/A"}</p>
        </label>
      </div>

      {/**Six Two Part */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* Skills field */}
        <label>
          <div className="label">
            <span className="font-semibold font-inter">Skills :</span>
          </div>
          {skills?.map((skill, index) => (
            <span
              key={index}
              className="mr-2 text-primary bg-[#d0d8e0] py-1 px-3 rounded-full text-sm font-medium"
            >
              {skill?.value},{skill?.label}
            </span>
          )) || "N/A"}
        </label>
        {/* Skills field End */}

        {/* Resume field */}

        <label>
          <div className="pt-1 mb-2">
            <span className="font-bold font-inter  ">Resume :</span>
          </div>
          <a href={resume_link} target="blank">
            <div className="flex w-44 gap-2 font-semibold  text-white cursor-pointer font-inter text-base px-8 py-[8px] bg-primary rounded-xl transition-all duration-500 text-[15px]">
              {" "}
              <LuDownload className="text-2xl" /> <span> Download</span>{" "}
            </div>
          </a>
        </label>

        {/* <label>
          <div className="label">
            <span className="font-bold font-inter">Resume : </span>
            <label className="font-semibold  text-white cursor-pointer font-inter text-base px-8   sm:py-[4px] md:py-[8px] bg-primary rounded-xl transition-all duration-500 text-[15px]">
              <div className="flex  gap-2">
                {" "}
                <img src={download_icon} alt="" /> <span> Download</span>{" "}
              </div>
            </label>
          </div>
        </label> */}
      </div>
    </div>
  );
};

export default UserProfile;
