import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.gif";
import { BiHomeAlt2 } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { LuUser, LuUsers2, LuUserCog } from "react-icons/lu";
import { IoDocumentOutline } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import { MdOutlineSave } from "react-icons/md";
import {} from "react-icons/lu";
import { GrUserWorker } from "react-icons/gr";
import { BsChatText } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { BiConversation } from "react-icons/bi";
import { HiBars3BottomRight } from "react-icons/hi2";
import "./dashboard.css";
import useUserRole from "../../hooks/useUserRole";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { TfiAlarmClock } from "react-icons/tfi";
import { GrDocumentPerformance } from "react-icons/gr";
import { FaAccessibleIcon } from "react-icons/fa";
const Dashboard = () => {
  const [isUser] = useUserRole();
  const { loginOut } = useContext(AuthContext);
  const dashboardItem = (
    <>
      {isUser?.role === "admin" && (
        <NavLink to="/dashboard/adminHome">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <BiHomeAlt2 />
                <span>Home</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}

      {isUser?.role === "user" && (
        <NavLink to="/dashboard/userProfile">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <GrUserWorker />
                <span>My Profile</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "user" && (
        <NavLink to="/dashboard/mySaveJob">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <MdOutlineSave />
                <span>My Saved Jobs</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}

      {isUser?.role === "admin" && (
        <NavLink to="/dashboard/userProfile">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <LuUser />
                <span>My Profile</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "employee" && (
        <NavLink to="/dashboard/attendance">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <TfiAlarmClock />
                <span>My Attendance</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "employee" && (
        <NavLink to="/dashboard/employee-profile">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <GrDocumentPerformance />
                <span>My Performance</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "employee" && (
        <NavLink to="/dashboard/userProfile">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <LuUser />
                <span>My Profile</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "employee" && (
        <NavLink to="/dashboard/leaveManagement">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <LuUser />
                <span>Leave Management</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "admin" && (
        <NavLink to="/dashboard/jobs">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <IoDocumentOutline />
                <span>Job Ads</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "admin" && (
        <NavLink to="/dashboard/addEvent">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <IoDocumentOutline />
                <span>AddEvent</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "admin" && (
        <NavLink to="/dashboard/leave-requests">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <FaAccessibleIcon />
                <span>Leave Requests</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}

      {isUser?.role === "admin" && (
        <NavLink to="/dashboard/all-users">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <LuUsers2 />
                <span>All Users</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "admin" && (
        <NavLink to="/dashboard/employees">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <GrUserWorker />
                <span>Employees</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "admin" && (
        <NavLink to="/dashboard/TaskManagement">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <GrUserWorker />
                <span>Task Management</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}

      <NavLink to="/dashboard/reviews">
        {({ isActive }) => (
          <li
            className={`${
              isActive ? "dashboard_item_active" : "dashboard_item"
            }`}
          >
            <div>
              <BsChatText />
              <span>Reviews</span>
            </div>
            <IoIosArrowForward className="hov_arrow hidden lg:block" />
          </li>
        )}
      </NavLink>
      <NavLink to="/dashboard/communication">
        {({ isActive }) => (
          <li
            className={`${
              isActive ? "dashboard_item_active" : "dashboard_item"
            }`}
          >
            <div>
              <BiConversation />
              <span>Communicate</span>
            </div>
            <IoIosArrowForward className="hov_arrow hidden lg:block" />
          </li>
        )}
      </NavLink>
    </>
  );

  return (
    <div id="dashboard">
      <div className="drawer drawer-start lg:hidden">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-white rounded-xl flex justify-between items-center p-3">
          <Link to="/">
            <img src={logo} className="w-2/6" alt="" />
          </Link>
          <label
            htmlFor="my-drawer-4"
            className="drawer-button hover:cursor-pointer"
          >
            <HiBars3BottomRight />
          </label>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul
            className="menu p-4 min-h-full bg-base-200 text-base-content"
            style={{ width: "70%" }}
          >
            {dashboardItem}
          </ul>
        </div>
      </div>
      <div className="left_container">
        <div className="nav_container">
          <div>
            <Link to="/">
              <img src={logo} className="w-3/4" alt="" />
            </Link>
            <ul>{dashboardItem}</ul>
          </div>
          <div>
            <div onClick={() => loginOut()} className="log_btn">
              <span>Log Out</span>
              <LuLogOut />
            </div>
          </div>
        </div>
      </div>
      <div className="right_container">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
