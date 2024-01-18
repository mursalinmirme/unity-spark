import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Testimonilas = () => {
  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axios.get("testimonials.json");
      return res.data;
    },
  });

  return (
    <div className="my-20">
      <div className="text-center md:w-1/2 mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold">Our Testimonials</h1>
        <p className="text-sm mt-2">
          Explore our vision and aspirations. From fostering innovation to
          championing customer satisfaction, discover the core objectives that
          guide our journey towards excellence.
        </p>
      </div>
      <div className="testimonials max-w-7xl mx-auto">
        <Swiper
          slidesPerView={2}
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
              <div className="border-2 rounded-lg p-5">
                <div className="text-center mb-5">
                  <img
                    className="rounded-full h-20 w-20 mx-auto"
                    src={item.image}
                    alt=""
                  />
                  <h1 className="font-semibold">{item.name}</h1>
                  <p className="text-sm">{item.title}</p>
                </div>
                <p className="text-center text-sm font-medium">
                  "{item.review}"
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
