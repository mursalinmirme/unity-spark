import "../../DashboardPages/EmployeePages/MyProfile/profile.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { FiEdit3 } from "react-icons/fi";
import download_icon from "../../../assets/images/download-Icon.png";
import counter_icon from "../../../assets/images/pen.png";
import { Link } from "react-router-dom";
import { useState } from "react";
const UserProfile = () => {
  const [count, setCount] = useState(90);
  return (
    <div>
      <div className="user_profile_container">
        <img src="https://i.ibb.co/vcBNZ2H/founder-1.jpg" alt="profile" />
        <div className="flex justify-between w-full">
          <div>
            <h2>John Doe</h2>
            <h3>johndoetheheroalom@gmail.com</h3>
          </div>
          <div className="flex gap-3 items-center relative">
            <div className="border-2 border-primary rounded-lg p-1">
              <img
                style={{ height: "18px", width: "18px" }}
                src={counter_icon}
                alt=""
              />
              <span className="bg-primary  w-5 h-5 absolute top-2 md:right-[112px] text-white flex items-center justify-center rounded-lg">
                0
              </span>
            </div>

            <Link to="/dashboard/userProfileEdit" className="edit_btn">
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
            Completed You Profile
          </h2>
          <h2> {count}% </h2>
        </div>
        <ProgressBar
          completed={count}
          bgColor="#433ebe"
          height="15px"
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
            <span className="font-extrabold font-inter">Email :</span>
          </div>
          <p className="font-inter"> rifazul60@gmail.com </p>
        </label>
        {/* email field End */}

        {/* phone Number*/}
        <label>
          <div className="label">
            <span className="font-extrabold font-inter">Phone :</span>
          </div>
          <p className="font-inter"> N/A</p>
        </label>
      </div>

      {/**Second Two Part */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* Current Address field */}
        <label>
          <div className="label">
            <span className="font-bold font-inter">Current Address :</span>
          </div>
          <p className="font-inter">N/A</p>
        </label>
        {/* Current Address field End */}

        {/* Permanent Address */}
        <label>
          <div className="label">
            <span className="font-bold font-inter">Permanent Address :</span>
          </div>

          <p className="font-inter"> N/A</p>
        </label>
      </div>

      {/**Three Two Part */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* Age field */}
        <label>
          <div className="label">
            <span className="font-bold font-inter">Age :</span>
          </div>
          <p className="font-inter"> 22</p>
        </label>
        {/* Age field End */}

        {/* Your Gender Select */}
        <label>
          <div className="label">
            <span className="font-bold font-inter">Gender :</span>
          </div>
          <p className="font-inter"> Male</p>
        </label>
      </div>

      {/**Four Two Part */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* name field */}
        <label>
          <div className="label">
            <span className="font-bold font-inter">Education Level :</span>
          </div>
          <p className="font-inter"> N/A </p>
        </label>
        {/* Education field End */}

        {/* Institute Name field */}
        <label>
          <div className="label">
            <span className="font-bold font-inter">Institute Name :</span>
          </div>
          <p className="font-inter"> N/A</p>
        </label>
      </div>

      {/**five Two Part */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* Job Preference field */}
        <label>
          <div className="label">
            <span className="font-bold font-inter">Job Preference :</span>
          </div>
          <p className="font-inter"> N/A</p>
        </label>
        {/* Preference field End */}

        {/* Time Preference field */}
        <label>
          <div className="label">
            <span className="font-bold font-inter">Time Preference :</span>
          </div>

          <p className="font-inter"> Intern</p>
        </label>
      </div>

      {/**Six Two Part */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* Skills field */}
        <label>
          <div className="label">
            <span className="font-bold font-inter">Skills :</span>
          </div>
          <span> JavaScript</span> , <span> React </span>
        </label>
        {/* Skills field End */}

        {/* Resume field */}

        <label>
          <div className="label">
            <span className="font-bold font-inter">Resume :</span>
          </div>
          <a
            href="https://drive.google.com/file/d/1V_LBzGVe0-09I8BjDjRUMgpXwbaDczHh/view?usp=sharing"
            target="blank"
          >
            <div className="flex w-44 gap-2 font-semibold  text-white cursor-pointer font-inter text-base px-8 py-[8px] bg-primary rounded-xl transition-all duration-500 text-[15px]">
              {" "}
              <img src={download_icon} alt="" /> <span> Download</span>{" "}
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
