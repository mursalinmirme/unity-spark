const Banner = () => {
  return (
    <div className="about_banner flex flex-col-reverse md:flex-row gap-10 items-center md:justify-between my-24 py-10">
      <div className="space-y-5 mt-20">
        <p className="bg-[#427aa1] w-[120px] text-center py-3 rounded-3xl text-white font-semibold">
          ABOUT
        </p>
        <h2>
          Chronicles of Excellence <br /> Unveiling Our Purpose
        </h2>
        <p className="max-w-[500px] font-inter text-xl font-medium">
          Discover the journey that defines us. From our humble beginnings to
          our present endeavors, explore the narrative of our passion, values,
          and the unwavering commitment that drives us forward.
        </p>
      </div>
      <div className="relative">
        <div className="w-[400px] h-[320px] border-[5px] border-[#248479] rounded-2xl bg-transparent"></div>
        <img
          className="absolute left-[40%] bottom-[60%] w-[340px] z-40"
          src="https://i.ibb.co/SVVRSCJ/banner-1.png"
          alt=""
        />
        <img
          className="absolute top-[11%] right-[40%] w-[340px] z-30"
          src="https://i.ibb.co/19hg9W1/banner-2.png"
          alt=""
        />
        <img
          className="absolute top-[60%] left-[40%] w-[340px]"
          src="https://i.ibb.co/mShxjzN/banner-3.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
