const Banner = () => {
  // This Banner Part
  return (
    <div className="about_banner  !border-primary">
      <div className="left_container">
        <span>ABOUT</span>
        <h2>Chronicles of Excellence Unveiling Our Purpose</h2>
        <p>
          At Unity Spark, we specialize in innovative Human Resource Management
          solutions designed to elevate businesses to new heights. Our platform
          seamlessly integrates cutting-edge technologies, fostering efficient
          operations and empowering companies to nurture a thriving workplace
          culture.
        </p>
      </div>
      <div className="lg:flex-1 right_container">
        <div className="img_container ">
          <div className=""></div>
          <img
            className="first_img"
            src="https://i.ibb.co/SVVRSCJ/banner-1.png"
            alt=""
          />
          <img
            className="second_img"
            src="https://i.ibb.co/19hg9W1/banner-2.png"
            alt=""
          />
          <img
            className="third_img"
            src="https://i.ibb.co/mShxjzN/banner-3.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
