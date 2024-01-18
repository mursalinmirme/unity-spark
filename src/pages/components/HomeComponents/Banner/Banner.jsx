import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Banner = () => {
    const { isPending, error, data: banner } = useQuery({
        queryKey: ['banner_info'],
        queryFn: async() => {
            const res = await axios.get('banner_info.json')
            return res.data
        }
    })


    return (
        <div className="banner">
            <Swiper
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
                {
                    banner?.map((ban, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="grid grid-cols-2 items-center">
                                <div className="space-y-5">
                                    <img src={'https://i.ibb.co/sJZrRTS/wait.gif'} className='w-10 mb-5' alt="" />
                                    <span>Hi there</span>
                                    <h2>{ban?.title}</h2>
                                    <p>{ban?.description}</p>
                                    <button>{ban?.button}</button>
                                </div>
                                <div>
                                    <img src={ban?.img} alt="" />
                                </div>     
                            </div>   
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            
        </div>
    );
};

export default Banner;