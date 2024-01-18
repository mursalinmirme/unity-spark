import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";

const Testimonilas = () => {
  const screenSize = useState(window.innerWidth);

  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axios.get("testimonials.json");
      return res.data;
    },
  });

  return (
    <div className="testimonial py-10">
      <h2>Our Testimonials</h2>
      <h6>
        Explore our vision and aspirations. From fostering innovation to
        championing customer satisfaction, discover the core objectives that
        guide our journey towards excellence.
      </h6>
      <div className="mt-8">
        <Swiper
          slidesPerView={screenSize[0] > 768 ? 2 : 1}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {testimonials?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="testimonial_card">
                <div className="text-center mb-2">
                  <img
                    src={item.image}
                    alt="Person"
                  />
                  <h3>{item.name}</h3>
                  <h4>{item.title}</h4>
                </div>
                <p>
                  {`"`}{item.review}{`"`}
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
