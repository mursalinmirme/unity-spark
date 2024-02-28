// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Autoplay, Pagination } from "swiper/modules";
// import { useQuery } from "@tanstack/react-query";
// import Loading from "../../Loading/Loading";
// import axios from "axios";
import BannerImg from '../../../../assets/images/banner.gif'

const Banner = () => {
  // const { isPending, data: banner } = useQuery({
  //   queryKey: ["banner_info"],
  //   queryFn: async () => {
  //     const res = await axios.get("banner_info.json");
  //     return res.data;
  //   },
  // });

  return (
    <div className="banner">
      {/* {isPending ? (
        <Loading></Loading>
      ) : (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination]}
        >
          {banner?.map((ban, idx) => (
            <SwiperSlide key={idx}>
              <div className="slide_container">
                <div className="space-y-3 md:space-y-6">
                  <span>Hi there</span>
                  <h2>{ban?.title}</h2>
                  <p>{ban?.description}</p>
                  <button className="nbtn">{ban?.button}</button>
                </div>
                <div>
                  <img src={ban?.img} className="w-full" alt="" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )} */}
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
