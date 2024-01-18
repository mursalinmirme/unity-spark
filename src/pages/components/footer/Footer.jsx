import footerLogo from "../../../assets/images/footerLogo/footerLogo.gif";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";

const Footer = () => {
    
    return (
        <div className="bg-base-200 font-inter">
            <footer className="footer flex flex-col lg:flex-row justify-between pt-20 pb-10 w-11/12 lg:w-10/12 mx-auto text-base-content">
  <aside className="w-80">
    <img className="w-48" src={footerLogo} alt="" />
    <p className="mt-5 leading-relaxed text-base">Empowering organizations through innovative and efficient Human Resource Management solutions.</p>
    <h6 className="text-xl font-semibold mt-4">Social Media</h6>
    <div className="flex text-3xl space-x-3.5 mt-2">
    <a className="text-[#1877f2]" href="#"><FaFacebook /></a>
      <a className="text-[#1877f2]" href="#"><FaLinkedinIn /></a>
      <a style={{background: `linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d, #f56040, #f77737, #fcaf45, #ffdc80)`}} className="text-[#FFFFFF] rounded-md" href="#"><FaInstagram /></a>
      <a className="text-[#000000]" href="#"><FaSquareXTwitter /></a>
      <a className="text-[#B7081B]" href="#"><FaPinterest /></a>
    </div>
  </aside> 
  <nav className="space-y-1.5 text-base">
    <header className="footer-title text-lg">Services</header> 
    <a className="link link-hover">Recruitment Services</a>
    <a className="link link-hover">Employee Management</a>
    <a className="link link-hover">Communication Hub</a>
    <a className="link link-hover">Legal Compliance</a>
  </nav> 
  <nav className="space-y-1.5 text-base">
    <header className="footer-title text-lg">Company</header> 
    <a className="link link-hover">Mission Statement</a>
    <a className="link link-hover">About Us</a>
    <a className="link link-hover">Contact Information</a>
    <a className="link link-hover">Careers</a>
  </nav> 
  <nav className="space-y-1.5 text-base">
    <header className="footer-title text-lg">Legal</header> 
    <a className="link link-hover">Terms of Service </a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Disclaimer</a>
    <a className="link link-hover">Accessibility Statement</a>
  </nav>

 

</footer>
<p className="text-center py-5 text-sm md:text-base border-t-2">© All Right Reserved By Team Code Wizards - 2024</p>
        </div>
    );
};

export default Footer;