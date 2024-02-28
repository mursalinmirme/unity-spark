import BannerImg from '../../../../assets/images/banner.gif'

const Banner = () => {

  return (
    <div className="banner">
      <div className="slide_container">
        <div className="space-y-3 md:space-y-6">
          <span>Hi there</span>
          <h2>Elevate Your Workforce Management</h2>
          <p>Enhance efficiency and engagement with our comprehensive HR solutions. Streamline processes, elevate workplace experience, and transform operations today.</p>
          <button className="nbtn">Get Started Today</button>
        </div>
        <div>
          <img src={BannerImg} className="w-full" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
