import { useState } from "react";
import "./profile.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { FiEdit3 } from "react-icons/fi";
import { GoThumbsup } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import EmployeeProfileEdit from "./EmployeeProfileEdit";

const tabs = [
  {
    name: "1w",
    id: 0,
  },
  {
    name: "2w",
    id: 1,
  },
  {
    name: "1m",
    id: 2,
  },
  {
    name: "1y",
    id: 3,
  },
  {
    name: "All",
    id: 4,
  },
];

const MyProfile = () => {
  const [isActive, setIsActive] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);

  const handlePerformanceTab = (id) => {
    setIsActive(id);
  };

  return (
    <div className="user_profile">
      <div className="user_profile_container">
        <img src="https://i.ibb.co/vcBNZ2H/founder-1.jpg" alt="profile" />
        <div className="flex justify-between w-full">
          <div>
            <h2>John Doe</h2>
            <h3>johndoe@gmail.com</h3>
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
          <div className="flex items-center gap-2">
            {openEditor ? (
              <a
                className={`flex items-center font-inter text-red-500 gap-1 font-medium border-2 rounded-md border-red-500 px-2 py-0.5 cursor-pointer text-red hover:text-white hover:bg-red-500 transition-all`}
                onClick={() => setOpenEditor(false)}
              >
                <RxCross2 />
                <span>Cancel</span>
              </a>
            ) : (
              <a className={`edit_btn`} onClick={() => setOpenEditor(true)}>
                <FiEdit3 />
                <span>Edit Info</span>
              </a>
            )}
            <Link className="edit_btn" to="/dashboard/reviews">
              <GoThumbsup />
              <span>Give Review</span>
            </Link>
          </div>
        </div>
      </div>

      <hr className="my-6" />
      <div className="badge_container">
        <span>Web Developer</span>
        <span>Remote</span>
        <span>Full-time</span>
      </div>
      <div className={`tab_container ${openEditor ? "hidden" : "block"}`}>
        <div className="tab_div">
          <h2>Performance</h2>
          <div className="tabs">
            {tabs?.map((tab) => (
              <a
                key={tab.id}
                className={`tab_btn ${
                  isActive === tab.id
                    ? "font-medium text-white bg-primary"
                    : "bg-transperant text-primary font-semibold"
                }`}
                onClick={() => handlePerformanceTab(tab.id)}
              >
                {tab.name}
              </a>
            ))}
          </div>
        </div>
        <table className="w-full border-t-2">
          <tr>
            <th>Attendance</th>
            <th>Rest Day</th>
            <th>Overtime</th>
            <th>Scrum Joined</th>
          </tr>
          <tr>
            <td>60Days</td>
            <td>60Days</td>
            <td>60Days</td>
            <td>60Days</td>
          </tr>
          <tr>
            <td>60Hours</td>
            <td>60Hours</td>
            <td>60Hours</td>
            <td>60Hours</td>
          </tr>
          <tr>
            <td>60Minutes</td>
            <td>60Minutes</td>
            <td>60Minutes</td>
            <td>60Minutes</td>
          </tr>
          <tr>
            <td>60Seconds</td>
            <td>60Seconds</td>
            <td>60Seconds</td>
            <td>60Seconds</td>
          </tr>
        </table>
      </div>

      {/* EDITOR */}
      <div className={`profile-form ${openEditor ? "block" : "hidden"}`}>
        <EmployeeProfileEdit></EmployeeProfileEdit>
      </div>
    </div>
  );
};

export default MyProfile;
