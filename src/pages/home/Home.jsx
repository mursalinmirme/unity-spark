import Banner from "../components/HomeComponents/Banner/Banner";
import Counter from "../components/HomeComponents/Counter/Counter";
import Goals from "../components/HomeComponents/Goals/Goals";
import ContactUs from "../components/HomeComponents/ContactUs/ContactUs";
import JobPost from "../components/HomeComponents/JobPost/JobPost";
import OurService from "../components/HomeComponents/OurService/OurService";
import Newsletter from "../components/HomeComponents/newsletter/Newsletter";
import Testimonilas from "../components/HomeComponents/Testimonials/Testimonilas";
import WhyDifferent from "../components/HomeComponents/WhyDifferent/WhyDifferent";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Counter></Counter>
      <OurService></OurService>
      <WhyDifferent></WhyDifferent>
      <JobPost></JobPost>
      <Goals></Goals>
      <Testimonilas></Testimonilas>
      <Newsletter></Newsletter>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
