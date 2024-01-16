import { Link, NavLink } from "react-router-dom";
import logo from '../../../assets/images/logo.gif'

const Navbar = () => {
    const navItem = <>

        <NavLink to="/">
          {({ isActive }) => (
             <li className={isActive ? "text-white bg-[#248479] px-3 py-1.5 rounded-md" : "px-3 py-1.5"}>Home</li>
                )}
                   </NavLink>  
        <NavLink to="/dashboard">
          {({ isActive }) => (
             <li className={isActive ? "text-white bg-[#248479] px-3 py-1.5 rounded-md" : "px-3 py-1.5"}>Dashboard</li>
                )}
                   </NavLink>  
        <NavLink to="/about-us">
          {({ isActive }) => (
             <li className={isActive ? "text-white bg-[#248479] px-3 py-1.5 rounded-md" : "px-3 py-1.5"}>About Us</li>
                )}
                   </NavLink>  
        <NavLink to="/signin">
          {({ isActive }) => (
             <li className={isActive ? "text-white bg-[#248479] px-3 py-1.5 rounded-md" : "px-3 py-1.5"}>Sign In</li>
                )}
                   </NavLink>  
        <NavLink to="signup">
          {({ isActive }) => (
             <li className={isActive ? "text-white bg-[#248479] px-3 py-1.5 rounded-md" : "px-3 py-1.5"}>Signup</li>
                )}
                   </NavLink>  
    </>
    return (
        <div className="">
            <div className="navbar py-5 border-b w-11/12 mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {
            navItem
        }
      </ul>
    </div>
    <Link to='/'>
      <img src={logo} className="w-1/2" alt="" />
    </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 space-x-8 font-medium text-base">
      {
        navItem
      }
    </ul>
  </div>
  <div className="navbar-end">
    <Link to={"/signin"}><a className="btn rounded-md bg-[#248479] hover:bg-[#22524c] text-white">Join Now</a></Link>
  </div>
</div>
        </div>
    );
};

export default Navbar;