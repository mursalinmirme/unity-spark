import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const Testimonilas = () => {
  const screenSize = useState(window.innerWidth);
  const axiosPublic = useAxiosPublic();

  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-feedback");
      return res?.data;
    },
  });

  return (
    <div className="testimonial py-10">
      <h2>Our Testimonials</h2>
      <h6>Voices of Success: Clients Speak Out.</h6>
      <div className="mt-8">
        <Swiper
          // slidesPerView={screenSize[0] > 768 ? 2 : 1}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          breakpoints={{
            480: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
          }}
        >
          {testimonials?.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="testimonial_card">
                <div className="text-center mb-2">
                  <img className="w-10 h-10" src={item.image} alt="Person" />
                  <h3>{item.name}</h3>
                  <h4>{item.employeePosition}</h4>
                </div>
                <p className="line-clamp-3">
                  {`"`}
                  {item.description}
                  {`"`}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonilas;
