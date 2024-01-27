import { useContext, useState } from "react";
import "./profile.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { FiEdit3 } from "react-icons/fi";
import { GoThumbsup } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import EmployeeProfileEdit from "./EmployeeProfileEdit";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["user_data"],
    queryFn: async () => {
      const res = await axios.get(
        `https://unity-spark-server.vercel.app/users/${user?.email}`
      );
      return res.data;
    },
  });

  const handlePerformanceTab = (id) => {
    setIsActive(id);
  };

  return (
    <div className="user_profile">
      <div className="user_profile_container">
        <img src={data?.image} alt="profile" className="hidden md:block" />
        <div className="flex justify-between items-center w-full md:hidden ">
          <img src={data?.image} alt="profile" className="md:hidden" />
          <div className="items-center space-y-2 block md:hidden">
            {openEditor ? (
              <a
                className={`flex items-center font-inter text-red-500 text-base gap-1 font-medium border-2 rounded-md border-red-500 px-2 py-0.5 cursor-pointer text-red hover:text-white hover:bg-red-500 transition-all`}
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
        <div className="flex justify-between w-full">
          <div>
            <h2>{data?.name}</h2>
            <h3>{data?.email}</h3>
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
          <div className="items-center gap-2 hidden md:flex">
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
        <div className="overflow-x-auto">
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
      </div>

      {/* EDITOR */}
      <div className={`profile-form ${openEditor ? "block" : "hidden"}`}>
        <EmployeeProfileEdit
          user={data}
          setOpenEditor={setOpenEditor}
        ></EmployeeProfileEdit>
      </div>
    </div>
  );
};

export default MyProfile;
