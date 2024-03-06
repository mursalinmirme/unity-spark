import Banner from "../components/HomeComponents/Banner/Banner";
import ContactUs from "../components/HomeComponents/ContactUs/ContactUs";
import Counter from "../components/HomeComponents/Counter/Counter";
import Goals from "../components/HomeComponents/Goals/Goals";
import JobPost from "../components/HomeComponents/JobPost/JobPost";
import OurService from "../components/HomeComponents/OurService/OurService";
import Testimonilas from "../components/HomeComponents/Testimonials/Testimonilas";
import WhyDifferent from "../components/HomeComponents/WhyDifferent/WhyDifferent";
import Newsletter from "../components/HomeComponents/newsletter/Newsletter";

const Home = () => {
  return (
    <div>
      <div className="max-w-[92%] lg:max-w-[1200px] mx-auto">
        <Banner></Banner>
      </div>
      <div className="max-w-[92%] lg:max-w-[1200px] mx-auto">
        <Counter></Counter>
      </div>
      <div className="max-w-[92%] lg:max-w-[1200px] mx-auto">
        <OurService></OurService>
      </div>
      <div className="max-w-[92%] lg:max-w-[1200px] mx-auto">
        <WhyDifferent></WhyDifferent>
      </div>
      <div className="max-w-[92%] lg:max-w-[1200px] mx-auto">
        <JobPost></JobPost>
      </div>
      <div className="max-w-[92%] lg:max-w-[1200px] mx-auto">
        <Goals></Goals>
      </div>
      <div className="max-w-[92%] lg:max-w-[1200px] mx-auto">
        <Testimonilas></Testimonilas>
      </div>
      {/* <div className="max-w-[92%] lg:max-w-[1200px] mx-auto"> */}
        <Newsletter></Newsletter>
      {/* </div> */}
      <div className="max-w-[92%] lg:max-w-[1200px] mx-auto">
        <ContactUs></ContactUs>
      </div>
    </div>
  );
};

export default Home;
