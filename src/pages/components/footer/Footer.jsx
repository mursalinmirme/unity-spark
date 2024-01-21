import footerLogo from "../../../assets/images/footerLogo/footerLogo.gif";
import instagram from '../../../assets/social/instagram.png'
import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";

const Footer = () => {
    
    return (
        <div id="footer">
            <footer>
              <aside className="w-80">
                <img className="w-48" src={footerLogo} alt="" />
                <p>Empowering organizations through innovative and efficient Human Resource Management solutions.</p>
                <h6>Social Media</h6>
                <div>
                  <a className="text-[#0866FF]" href="#"><FaFacebook  /></a>
                  <a className="text-[#0A66C2]" href="#"><FaLinkedinIn  /></a>
                  <a href="#"><img src={instagram} className="w-[27px]" alt="" /></a>
                  <a href="#"><FaXTwitter  /></a>
                  <a className="text-[#E60023]" href="#"><FaPinterest  /></a>
                </div>
              </aside> 
              <nav>
                <header>Services</header> 
                <a>Recruitment Services</a>
                <a>Employee Management</a>
                <a>Communication Hub</a>
                <a>Legal Compliance</a>
              </nav> 
              <nav>
                <header>Company</header> 
                <a>Mission Statement</a>
                <a>About Us</a>
                <a>Contact Information</a>
                <a>Careers</a>
              </nav> 
              <nav>
                <header>Legal</header> 
                <a>Terms of Service </a>
                <a>Privacy policy</a>
                <a>Disclaimer</a>
                <a>Accessibility Statement</a>
              </nav>
          </footer>
          <p className="copyright">© All Right Reserved By Team Code Wizards - 2024</p>
        </div>
    );
};

export default Footer;