import Banner from "../components/Banner/Banner";
import Counter from "../components/Counter/Counter";
import Goals from "../components/Goals/Goals";
import ContactUs from "./ContactUs/ContactUs";
import JobPost from "./JobPost/JobPost";
import OurService from "./OurService/OurService";
import Testimonilas from "./Testimonials/Testimonilas";

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
