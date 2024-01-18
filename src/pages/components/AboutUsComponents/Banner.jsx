const Banner = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center py-20 px-3 md:px-5 lg:px-0">
      <div className="lg:flex-1 mt-20 lg:mt-0">
        <p className="bg-[#427aa1] text-center py-3 px-10 rounded-xl text-white font-semibold inline-block">
          ABOUT
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold leading-snug text-[#1E1E1E] mt-5">
          Chronicles of Excellence <br /> Unveiling Our Purpose
        </h2>
        <p className="font-inter text-base lg:text-base font-medium leading-normal mt-3 lg:pr-10">
        At Unity Spark, we specialize in innovative Human Resource Management solutions designed to elevate businesses to new heights. Our platform seamlessly integrates cutting-edge technologies, fostering efficient operations and empowering companies to nurture a thriving workplace culture. 
        </p>
      </div>
      <div className="lg:flex-1">
        <div className="relative w-full h-80">
        <div className="w-2/3 md:w-2/5 lg:w-1/2 h-56 md:h-60 lg:h-72 border-4 border-[rgb(36,132,121)] absolute z-0 top-8 lg:top-5 left-20 md:left-60 lg:left-40 rounded-3xl"></div>
        <img
          className="absolute -top-10 md:-top-12 lg:-top-10 w-60 md:w-auto right-0 md:right-16 lg:right-0 z-30"
          src="https://i.ibb.co/SVVRSCJ/banner-1.png"
          alt=""
        />
        <img
          className="absolute w-60 md:w-auto md:left-28 lg:left-16 top-14 md:top-12 lg:top-14 z-40 lg:z-20"
          src="https://i.ibb.co/19hg9W1/banner-2.png"
          alt=""
        />
        <img
          className="absolute w-60 md:w-auto right-0 md:right-16 lg:right-0 bottom-0 md:-bottom-10"
          src="https://i.ibb.co/mShxjzN/banner-3.png"
          alt=""
        />
        </div>
      </div>
    </div>
  );
};

export default Banner;
