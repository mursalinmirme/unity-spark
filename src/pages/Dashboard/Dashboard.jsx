import { useContext, useState } from "react";
import { BiHomeAlt2, BiMessageSquareDots } from "react-icons/bi";
import { BsChatText } from "react-icons/bs";
import { GrDocumentPerformance, GrUserWorker } from "react-icons/gr";
import {
  HiBars3BottomRight,
  HiOutlineArrowUpOnSquareStack,
  HiOutlineDocumentCheck,
  HiOutlineDocumentDuplicate,
} from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { GrDocumentTime } from "react-icons/gr";
import {
  IoCalendarOutline,
  IoDocumentAttachOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { LuLogOut, LuUser, LuUsers2 } from "react-icons/lu";
import { TfiAlarmClock } from "react-icons/tfi";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import logo from "../../assets/images/final-logo.png";
import useUserRole from "../../hooks/useUserRole";
import {
  MdOutlineAddTask,
  MdOutlinePayments,
  MdOutlinePersonSearch,
} from "react-icons/md";
import { RiGraduationCapLine } from "react-icons/ri";
import { LuPresentation } from "react-icons/lu";
import { GrAnnounce } from "react-icons/gr";
import { LiaMicrophoneAltSolid } from "react-icons/lia";
import "./dashboard.css";

const Dashboard = () => {
  const [isUser] = useUserRole();
  const { loginOut } = useContext(AuthContext);
  const [showLogo, setShowLogo] = useState(true);

  const dashboardItem = (
    <>
      {isUser?.role === "employee" && (
        <NavLink to="/dashboard/employeeHome">
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
        <NavLink to="/dashboard/user-profile">
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
      {isUser?.role === "user" && (
        <NavLink to="/dashboard/mySaveJob">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <IoDocumentAttachOutline />
                <span>My Saved Jobs</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}

      {isUser?.role === "admin" && (
        <NavLink to="/dashboard/admin-home">
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

      {isUser?.role === "admin" && (
        <NavLink to="/dashboard/user-profile">
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
        <NavLink to="/dashboard/user-profile">
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
                <HiOutlineArrowUpOnSquareStack />
                <span>Leave Management</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "employee" && (
        <NavLink to="/dashboard/myBlogs">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <HiOutlineDocumentDuplicate />
                <span>My Blogs</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}

      {isUser?.role !== "admin" && (
        <NavLink to="/dashboard/savedBlogs">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <HiOutlineDocumentCheck />
                <span>Saved Blogs</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}

      {isUser?.role === "employee" && (
        <NavLink to="/dashboard/training">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <RiGraduationCapLine />
                <span>Training</span>
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
                <MdOutlinePersonSearch />
                <span>Recruitment</span>
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
                <IoCalendarOutline />
                <span>Events</span>
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
                <HiOutlineArrowUpOnSquareStack />
                <span>Leave Requests</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}

      {isUser?.role === "admin" && (
        <NavLink to="/dashboard/blog-requests">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <GrDocumentTime />
                <span>Blog Requests</span>
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
        <NavLink to="/dashboard/interviews">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <LiaMicrophoneAltSolid />
                <span>interviews</span>
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
                <MdOutlineAddTask />
                <span>Task Management</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "admin" && (
        <NavLink to="/dashboard/training-management">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <LuPresentation />
                <span>Training Management</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "admin" && (
        <NavLink to="/dashboard/payment-management">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <MdOutlinePayments />
                <span>Payment Management</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "user" && (
        <NavLink to="/dashboard/my-applications">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <IoDocumentTextOutline />
                <span>My Applications</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "user" && (
        <NavLink to="/dashboard/interview">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <LiaMicrophoneAltSolid />
                <span>My Interviews</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "admin" && (
        <NavLink to="/dashboard/newsletter-subscribers">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <GrAnnounce />
                <span>Newsletter Subscribers</span>
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

      {isUser?.role !== "user" && (
        <NavLink to="/dashboard/communication">
          {({ isActive }) => (
            <li
              className={`${
                isActive ? "dashboard_item_active" : "dashboard_item"
              }`}
            >
              <div>
                <BiMessageSquareDots />
                <span>Communicate</span>
              </div>
              <IoIosArrowForward className="hov_arrow hidden lg:block" />
            </li>
          )}
        </NavLink>
      )}
    </>
  );

  return (
    <div className="bg-[#f5f5fb]">
      <div id="dashboard">
        <div className="drawer drawer-start lg:hidden">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content bg-white rounded-xl flex justify-between items-center p-3">
            <Link to="/">
              <img src={logo} className="w-2/4 md:w-1/4" alt="" />
            </Link>
            <label
              htmlFor="my-drawer-4"
              className="drawer-button hover:cursor-pointer"
            >
              <HiBars3BottomRight className="text-2xl" />
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
          <div
            className="nav_container"
            style={{ height: "calc(100vh - 3rem)" }}
          >
            <div>
              <div
                onMouseEnter={() => {
                  setShowLogo(false);
                }}
                onMouseLeave={() => {
                  setShowLogo(true);
                }}
              >
                <Link to="/">
                  <img src={logo} className="w-3/4 h-12" alt="" />
                </Link>
              </div>
              <ul>{dashboardItem}</ul>
            </div>
            <div className="mt-5">
              <div onClick={() => loginOut()} className="log_btn">
                <span>Log Out</span>
                <LuLogOut />
              </div>
            </div>
          </div>
        </div>
        <div
          className="right_container"
          style={{ height: "calc(100vh - 3rem)" }}
        >
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
