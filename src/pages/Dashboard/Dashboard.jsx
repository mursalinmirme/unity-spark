import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.gif";
import { BiHomeAlt2 } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { LuUser, LuUsers2, LuUserCog } from "react-icons/lu";
import { IoDocumentOutline } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import {  } from "react-icons/lu";
import { GrUserWorker } from "react-icons/gr";
import { BsChatText } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { BiConversation } from "react-icons/bi";
import { HiBars3BottomRight } from "react-icons/hi2";
import "./dashboard.css";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../components/Loading/Loading";

const Dashboard = () => {

  const [ isUser, isLoading ] = useUserRole();
  console.log("The current user role is", isUser.role);


  if(isLoading){
    return <Loading></Loading>
  }


  const dashboardItem = (
    <>
      <NavLink to="/dashboard">
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
      {
        isUser?.role === "user" && 
        <NavLink to="/dashboard/profile">
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
      }
      <NavLink to="/dashboard/recruiment">
        {({ isActive }) => (
          <li
            className={`${
              isActive ? "dashboard_item_active" : "dashboard_item"
            }`}
          >
            <div>
              <LuUserCog  className="text-2xl"/>
              <span>Recruiment</span>
            </div>
            <IoIosArrowForward className="hov_arrow hidden lg:block" />
          </li>
        )}
      </NavLink>
      {
        isUser?.role === "admin" && 
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
      }
      {
        isUser?.role === "user" && 
        <NavLink to="/dashboard/tasks">
        {({ isActive }) => (
          <li
            className={`${
              isActive ? "dashboard_item_active" : "dashboard_item"
            }`}
          >
            <div>
              <BiTask />
              <span>Tasks</span>
            </div>
            <IoIosArrowForward className="hov_arrow hidden lg:block" />
          </li>
        )}
      </NavLink>
      }
      {
        isUser?.role === "admin" && 
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
      }
      {
        isUser?.role === "admin" && 
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
      }
      <NavLink to="/dashboard/userProfile">
        {({ isActive }) => (
          <li
            className={`${
              isActive ? "dashboard_item_active" : "dashboard_item"
            }`}
          >
            <div>
              <GrUserWorker />
              <span>UserProfile</span>
            </div>
            <IoIosArrowForward className="hov_arrow hidden lg:block" />
          </li>
        )}
      </NavLink>

      {/* 
      <NavLink to="/dashboard/userProfileEdit">
        {({ isActive }) => (
          <li
            className={`${
              isActive ? "dashboard_item_active" : "dashboard_item"
            }`}
          >
            <div>
              <BsChatText />
              <span>User Profile Edit</span>
            </div>
            <IoIosArrowForward className="hov_arrow hidden lg:block" />
          </li>
        )}
      </NavLink> */}

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
      <NavLink to="/">
        {({ isActive }) => (
          <li
            className={`${
              isActive ? "dashboard_item_active" : "dashboard_item"
            }`}
          >
            <div>
              <BsChatText />
              <span>Home Page </span>
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
          <img src={logo} className="w-2/6" alt="" />
          <label htmlFor="my-drawer-4" className="drawer-button">
            <HiBars3BottomRight />
          </label>
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 min-h-full bg-base-200 text-base-content" style={{width: '70%'}}>
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
            <ul className="min-h-[75vh]">{dashboardItem}</ul>          
          </div>
          <div>
            <div className="log_btn">
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
