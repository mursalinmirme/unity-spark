import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.gif";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, loginOut } = useContext(AuthContext);

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
      <NavLink to="/dashboard">
        {({ isActive }) => (
          <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
            Dashboard
          </li>
        )}
      </NavLink>
      <NavLink to="/available-jobs">
        {({ isActive }) => (
          <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
            Available Jobs
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
      <NavLink to="signup">
        {({ isActive }) => (
          <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>
            Signup
          </li>
        )}
      </NavLink>
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
            <button onClick={SignOut}>Sign out </button>
          ) : (
            <Link to={"/signin"}>
              <button>Join Now</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
