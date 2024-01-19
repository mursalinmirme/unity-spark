import footerLogo from "../../../assets/images/footerLogo/footerLogo.gif";
import instagram from '../../../assets/social/instagram.png'
import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";

const Footer = () => {
    
    return (
        <div className="bg-base-200 font-inter">
            <footer className="footer justify-between pt-12 pb-10 max-w-[92%] lg:max-w-[1200px] mx-auto  text-base-content">
              <aside className="w-80">
                <img className="w-48" src={footerLogo} alt="" />
                <p className="mt-5 leading-relaxed text-base">Empowering organizations through innovative and efficient Human Resource Management solutions.</p>
                <h6 className="text-xl font-semibold mt-4">Social Media</h6>
                <div className="flex text-3xl space-x-3.5 mt-2">
                <a className="text-[#0866FF]" href="#"><FaFacebook className="text-[27px]" /></a>
                  <a className="text-[#0A66C2]" href="#"><FaLinkedinIn className="text-[27px]" /></a>
                  <a href="#"><img src={instagram} className="w-[27px]" alt="" /></a>
                  <a href="#"><FaXTwitter className="text-[27px]" /></a>
                  <a className="text-[#E60023]" href="#"><FaPinterest className="text-[27px]" /></a>
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