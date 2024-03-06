import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/final-logo.png";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from 'sonner';
import useUserRole from "../../../hooks/useUserRole";

import { HiMiniBars3CenterLeft } from "react-icons/hi2";

const Navbar = () => {
  const { user, loginOut } = useContext(AuthContext);
  const [isUser] = useUserRole();

  const SignOut = () => {
    loginOut().then(() => {
      toast.success(" User Sign Out successfully");
    });
  };
  const navItem = (
    <>
      <NavLink to="/">
        {({ isActive }) => (
          <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
            Home
          </li>
        )}
      </NavLink>
      {isUser?.role === "admin" && user?.email && (
        <NavLink to="/dashboard/admin-home">
          {({ isActive }) => (
            <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
              Dashboard
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "user" && user?.email && (
        <NavLink to="/dashboard/user-profile">
          {({ isActive }) => (
            <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
              Dashboard
            </li>
          )}
        </NavLink>
      )}
      {isUser?.role === "employee" && user?.email && (
        <NavLink to="/dashboard/employeeHome">
          {({ isActive }) => (
            <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
              Dashboard
            </li>
          )}
        </NavLink>
      )}

      <NavLink to="/available-jobs">
        {({ isActive }) => (
          <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
            Available Jobs
          </li>
        )}
      </NavLink>
      <NavLink to="/events">
        {({ isActive }) => (
          <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
            Events
          </li>
        )}
      </NavLink>
      <NavLink to="/blog">
        {({ isActive }) => (
          <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
            Blogs
          </li>
        )}
      </NavLink>
      <NavLink to="/about-us">
        {({ isActive }) => (
          <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
            About Us
          </li>
        )}
      </NavLink>
      {!user && (
        <NavLink to="signup">
          {({ isActive }) => (
            <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
              Signup
            </li>
          )}
        </NavLink>
      )}
    </>
  );
  return (
    <div className="border-b-2" id="main-nav">
      <div className="navbar py-2 max-w-[100%] md:max-w-[92%] lg:max-w-[1200px] mx-auto">
        <div className="navbar-start">
          <div className="drawer drawer-start lg:hidden">
            <input
              id="my-drawer-12"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content bg-white rounded-xl flex justify-between items-center p-3">
              <label
                htmlFor="my-drawer-12"
                className="drawer-button hover:cursor-pointer text-2xl font-bold"
              >
                <HiMiniBars3CenterLeft />
              </label>
            </div>
            <div className="drawer-side z-50">
              <label
                htmlFor="my-drawer-12"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul
                className="menu p-4 min-h-full bg-base-200 text-base-content space-y-3 text-base font-medium"
                style={{ width: "70%" }}
              >
                {navItem}
              </ul>
            </div>
          </div>
          <Link to="/">
            <img src={logo} className="w-full md:w-4/5 lg:w-2/3 ml-[72px] md:ml-32 lg:ml-0" alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2 font-medium text-base">
            {navItem}
          </ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="">
                <img
                  className="h-12 w-12 rounded-full border-4"
                  alt=""
                  src={user?.photoURL}
                />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-36"
                style={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)" }}
              >
                <li className="rounded-lg">
                  <Link to="dashboard/user-profile">Profile</Link>
                </li>
                <hr className="h-0.5 w-3/4 bg-slate-400 ml-3" />
                <li className="rounded-lg">
                  <p onClick={SignOut}>Sign Out</p>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/signin"}>
              <button className="nbtn">Join Now</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
