<<<<<<< HEAD
import Banner from "../components/Banner/Banner";
import Counter from "../components/Counter/Counter";
import Goals from "../components/Goals/Goals";
import ContactUs from "./ContactUs/ContactUs";
import JobPost from "./JobPost/JobPost";
import OurService from "./OurService/OurService";
import Testimonilas from "./Testimonials/Testimonilas";
=======
import Banner from "../components/HomeComponents/Banner/Banner";
import Counter from "../components/HomeComponents/Counter/Counter";
import Goals from "../components/HomeComponents/Goals/Goals";
import ContactUs from "../components/HomeComponents/ContactUs/ContactUs";
import JobPost from "../components/HomeComponents/JobPost/JobPost";
import OurService from "../components/HomeComponents/OurService/OurService";
>>>>>>> 877dd7223ca496f5af9b3508d81af862c236390f

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Counter></Counter>
      <OurService></OurService>
      <JobPost></JobPost>
      <Goals></Goals>
      <Testimonilas></Testimonilas>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
