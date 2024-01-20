import { Link, NavLink } from "react-router-dom";
import logo from '../../../assets/images/logo.gif'
import { FaBarsStaggered } from "react-icons/fa6";

const Navbar = () => {
    const navItem = <>

        <NavLink to="/">
          {({ isActive }) => (
             <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>Home</li>
                )}
                   </NavLink>  
        <NavLink to="/dashboard">
          {({ isActive }) => (
             <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>Dashboard</li>
                )}
                   </NavLink>  
        <NavLink to="/about-us">
          {({ isActive }) => (
             <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>About Us</li>
                )}
                   </NavLink>  
        <NavLink to="/signin">
          {({ isActive }) => (
             <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>Sign In</li>
                )}
                   </NavLink>  
        <NavLink to="signup">
          {({ isActive }) => (
             <li className={`${isActive ? "nav_item_active" : ""} nav_item`}>Signup</li>
                )}
                   </NavLink>  
    </>
    return (
        <div className="border-b-2">
            <div className="header">
            <div className="navbar-start">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="nav_btn">
                  <FaBarsStaggered />
                </div>
                <ul tabIndex={0} className="phone_nav" >
                  {
                      navItem
                  }
                </ul>
              </div>
              <Link to='/'>
                <img src={logo} alt="" />
              </Link>
            </div>
            <div className="main_nav">
              <ul className="">
                {
                  navItem
                }
              </ul>
            </div>
            <div className="navbar-end">
              <Link to={"/signin"}><button>Join Now</button></Link>
            </div>
          </div>
        </div>
    );
};

export default Navbar;