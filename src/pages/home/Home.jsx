import Banner from "../components/Banner/Banner";
import Counter from "../components/Counter/Counter";
import Goals from "../components/Goals/Goals";
import JobPost from "./JobPost/JobPost";
import OurService from "./OurService/OurService";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Counter></Counter>
      <OurService></OurService>
      <JobPost></JobPost>
      <Goals></Goals>
    </div>
  );
};

export default Home;
