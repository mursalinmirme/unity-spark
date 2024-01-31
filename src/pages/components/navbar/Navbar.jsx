import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.gif";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Navbar = () => {
  const { user, loginOut } = useContext(AuthContext);
  const [isUser] = useUserRole();
  const axiosPublic = useAxiosPublic();
  const SignOut = () => {
    loginOut().then(() => {
      axiosPublic.post("/logout")
      .then(() => {
        toast.success(" User Sign Out successfully");
        console.log("User logout successfully");
      })
      .catch(() => {
        console.log("The token doesent remove");
      })
    })
    .catch(() => {
      console.log("Logout can not wroking");
    })
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
      {
        isUser?.role === "admin" && 
        <NavLink to="/dashboard/userProfile">
        {({ isActive }) => (
          <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
            Dashboard
          </li>
        )}
      </NavLink>
      }
      {
        isUser?.role === "user" && 
        <NavLink to="/dashboard/userProfile">
        {({ isActive }) => (
          <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
            Dashboard
          </li>
        )}
      </NavLink>
      }
      {
        isUser?.role === "employee" && 
        <NavLink to="/dashboard/employee-profile">
        {({ isActive }) => (
          <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
            Dashboard
          </li>
        )}
      </NavLink>
      }
      
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
      <NavLink to="/about-us">
        {({ isActive }) => (
          <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
            About Us
          </li>
        )}
      </NavLink>
      {
        !user && <NavLink to="signup">
        {({ isActive }) => (
          <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
            Signup
          </li>
        )}
      </NavLink>
      }
      
    </>
  );
  return (
    <div className="border-b-2">
      <div className="navbar py-2 max-w-[92%] lg:max-w-[1200px] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow rounded-box w-80 bg-white h-96 z-50 space-y-3"
            >
              {navItem}
            </ul>
          </div>
          <Link to="/">
            <img src={logo} className="w-full md:w-1/2 ml-12 md:ml-0" alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2 font-medium text-base">
            {navItem}
          </ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <button onClick={SignOut} className="nbtn">Sign out </button>
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
