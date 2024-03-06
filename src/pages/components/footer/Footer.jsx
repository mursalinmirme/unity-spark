import footerLogo from "../../../assets/images/footerLogo/footerLogo.png";
import instagram from "../../../assets/social/instagram.png";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  // this function just click link and top page show
  const newSystem = () => {
    window.scrollTo({ top: 1, behavior: "smooth" });
  };
  return (
    <div id="footer">
      <footer>
        <aside className="w-80">
          <img className="w-48" src={footerLogo} alt="" />
          <p>
            Empowering organizations through innovative and efficient Human
            Resource Management solutions.
          </p>
          <h6>Social Media</h6>
          <div>
            <a className="text-[#0866FF]" href="https://www.facebook.com/">
              <FaFacebook />
            </a>
            <a className="text-[#0A66C2]" href="https://www.linkedin.com/">
              <FaLinkedinIn />
            </a>
            <a href="https://www.instagram.com/">
              <img src={instagram} className="w-[30px]" alt="" />
            </a>
            <a href="https://twitter.com/">
              <FaXTwitter />
            </a>
            <a className="text-[#E60023]" href="https://www.pinterest.com/">
              <FaPinterest />
            </a>
          </div>
        </aside>
        <nav onClick={newSystem}>
          <header>Services</header>
          <Link to="/recruitmentService">Recruitment Services</Link>
          <Link to="/support">Support</Link>
          <Link to="/securityMeasure">Security Measure</Link>
          <Link to="/copyrightInfo">Copyright Information</Link>
        </nav>
        <nav onClick={newSystem}>
          <header>Company</header>

          <Link to="/about-us">About Us</Link>
          <Link to="/blog"> Blogs</Link>
          <Link to="/faq"> FAQs</Link>
          <Link to="/events">Events</Link>
        </nav>
        <nav onClick={newSystem}>
          <header>Legal</header>
          <Link to="/termsCondition">Terms of Condition </Link>
          <Link to="/privacy-policy">Privacy policy</Link>
          <Link to="/disclaimer">Disclaimer</Link>
          <Link to="/accessibility">Accessibility Statement</Link>
        </nav>
      </footer>
      <p className="copyright">
        © All Right Reserved By Team Code Wizards - 2024
      </p>
    </div>
  );
};

export default Footer;
