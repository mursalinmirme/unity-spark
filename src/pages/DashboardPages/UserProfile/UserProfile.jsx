import "../../DashboardPages/EmployeePages/MyProfile/profile.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUserInfo from "../../../hooks/useUserInfo";
import { LuDownload } from "react-icons/lu";
import { TbBookmark } from "react-icons/tb";

const UserProfile = () => {
  const { profileComplete } = useContext(AuthContext);
  const [openBookmark, setOpenBookmark] = useState(false);
  const [users] = useUserInfo();
  const {
    name,
    image,
    email,
    skills,
    gender,
    age,
    current_address,
    permanent_address,
    institute_name,
    phone,
    resume_link,
    time_preference,
    job_preference,
    education_level,
  } = users || {};

  return (
    <div className="relative overflow-hidden">
      <div className="user_profile_container">
        {users?.image ? (
          <img src={users?.image} alt="profile" />
        ) : (
          <CgProfile className="text-3xl" />
        )}
        <div className="flex justify-between w-full">
          <div>
            <h2>{users?.name}</h2>
            <h3>{users?.email}</h3>
          </div>
          <div className="flex gap-3 items-center relative">
            <button
              onClick={() => setOpenBookmark(!openBookmark)}
              className="py-1 px-1.5 rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-all duration-500"
            >
              <TbBookmark className="text-xl" />
            </button>

            <Link to="/dashboard/user-profile-edit" className="edit_btn">
              <span>Edit Info</span>
              <FiEdit3 />
            </Link>
          </div>
        </div>
        {/* BOOKMARK TAB */}
        <div
          className={`${
            openBookmark ? "top-6" : "-top-96"
          } w-[350px] p-5 rounded-xl space-y-4 absolute right-40 bg-white z-10 transition-all duration-500`}
          style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="border border-primary p-3 rounded-lg bg-[#ececf8] cursor-pointer">
            <h4 className="font-semibold font-inter">
              Develop training materials for new technologies and processes.
            </h4>
          </div>
          <div className="border border-green-600 p-3 rounded-lg bg-green-50">
            <h4 className="font-semibold font-inter">
              Write code for new features or applications
            </h4>
          </div>
        </div>
      </div>

      {/** Input Form Area  */}

      <div className="border-2 p-5 rounded-xl mt-8">
        <div className="grid md:grid-cols-2 gap-2">
          {/* Email field */}
          <label>
            <div className="">
              <span className="font-semibold font-inter">Email :</span>
            </div>
            <p className="font-inter"> {users?.email} </p>
          </label>
          {/* email field End */}

          {/* phone Number*/}
          <label>
            <div className="">
              <span className="font-semibold font-inter">Phone :</span>
            </div>
            <p className="font-inter"> {users?.phone || "N/A"} </p>
          </label>
        </div>

        {/**Second Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Current Address field */}
          <label>
            <div className="pt-1">
              <span className="font-semibold font-inter">
                Current Address :
              </span>
            </div>
            <p className="font-inter"> {users?.current_address || "N/A"}</p>
          </label>
          {/* Current Address field End */}

          {/* Permanent Address */}
          <label>
            <div className="pt-1">
              <span className="font-semibold font-inter">
                Permanent Address :
              </span>
            </div>

            <p className="font-inter">{users?.permanent_address || "N/A"}</p>
          </label>
        </div>

        {/**Three Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Age field */}
          <label>
            <div className="pt-1">
              <span className="font-semibold font-inter">Age :</span>
            </div>
            <p className="font-inter"> {users?.age || "N/A"} </p>
          </label>
          {/* Age field End */}

          {/* Your Gender Select */}
          <label>
            <div className="pt-1">
              <span className="font-semibold font-inter">Gender :</span>
            </div>
            <p className="font-inter"> {users?.gender || "N/A"} </p>
          </label>
        </div>

        {/**Four Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* name field */}
          <label>
            <div className="pt-1">
              <span className="font-semibold font-inter">
                Education Level :
              </span>
            </div>
            <p className="font-inter"> {users?.education_level || "N/A"} </p>
          </label>
          {/* Education field End */}

          {/* Institute Name field */}
          <label>
            <div className="pt-1">
              <span className="font-semibold font-inter">Institute Name :</span>
            </div>
            <p className="font-inter"> {users?.institute_name || "N/A"}</p>
          </label>
        </div>

        {/**five Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Job Preference field */}
          <label>
            <div className="pt-1">
              <span className="font-semibold font-inter">Job Preference :</span>
            </div>
            <p className="font-inter">{users?.job_preference || "N/A"} </p>
          </label>
          {/* Preference field End */}

          {/* Time Preference field */}
          <label>
            <div className="pt-1">
              <span className="font-semibold font-inter">
                Time Preference :
              </span>
            </div>

            <p className="font-inter"> {users?.time_preference || "N/A"}</p>
          </label>
        </div>

        {/**Six Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Skills field */}
          <label>
            <div className="pt-1 mb-2">
              <span className="font-semibold font-inter">Skills :</span>
            </div>
            {users?.skills?.map((skill, index) => (
              <span
                key={index}
                className="mr-2 text-primary bg-[#d0d8e0] py-1 px-3 rounded-full text-sm font-medium"
              >
                {skill?.value}
              </span>
            )) || "N/A"}
          </label>
          {/* Skills field End */}
          {/* Resume field */}
          <label>
            <div className="pt-1 mb-2">
              <span className="font-semibold font-inter  ">Resume :</span>
            </div>
            <a href={users?.resume_link} target="blank">
              <div className="inline-flex gap-2 font-semibold items-center text-white cursor-pointer font-inter text-base px-8 py-[8px] bg-primary rounded-xl transition-all duration-500 text-[15px]">
                {" "}
                <LuDownload className="text-lg" /> <span> Download</span>{" "}
              </div>
            </a>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
