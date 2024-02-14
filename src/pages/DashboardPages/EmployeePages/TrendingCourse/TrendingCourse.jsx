import { useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import { FaCirclePlay } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "./trendingcourse.css"
import { Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";

const TrendingCourse = () => {
   const [screenSize, setScreenSize] = useState(window.innerWidth);
    
   useEffect(() => {
      const handleResize = () => {
          setScreenSize(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);
//   const handleModalOpen = () => {
//    document.getElementById('my_modal_3').showModal()
//    }
    return (
        <div>            
            <h2 className="text-2xl font-semibold my-5">Trending Course</h2>
            <Swiper  slidesPerView={screenSize < 768 ? 1  : 2} spaceBetween={30} navigation={true} modules={[Navigation]} className="mySwiper courseSwiper">
                <SwiperSlide>
                    <Link to="" className="border border-[#46A3E1] rounded-xl overflow-hidden text-left">
                        <img src="https://i.ibb.co/3RMT44t/excel-live-crash-course-thumbnail.jpg" alt="course-img" className="rounded-t-lg overflow-hidden" />
                        <div className="space-y-3 p-4">
                            <h1 className="text-xl font-semibold font-inter">Microsoft Excel: Beginner to Advanced LIVE Crash Course</h1>
                            <div className="flex items-center justify-start gap-5">
                                <div className="bg-[#BBDDF4] px-2.5 flex items-center gap-2 rounded-lg py-1">
                                    <FaCirclePlay className="text-second bg-white rounded-full text-[15px]"></FaCirclePlay>
                                    <span className="font-semibold text-second text-[15px]">40 Lessons</span>
                                </div>
                                <div className="bg-[#BBDDF4] px-2.5 py-1 flex items-center gap-2 rounded-lg">
                                    <BsClock className="text-second text-[15px]"></BsClock>
                                    <span className="text-[15px] font-medium text-second">240 Hour</span>
                                </div>                                
                            </div>  
                            <div>
                                <button className="px-6 py-2 mt-1 bg-primary text-white font-semibold rounded-xl">Enroll Now</button>  
                            </div>                        
                        </div>
                    </Link>                    
                </SwiperSlide>
                <SwiperSlide>
                    <Link to="" className="border border-[#46A3E1] rounded-xl overflow-hidden text-left">
                        <img src="https://i.ibb.co/3RMT44t/excel-live-crash-course-thumbnail.jpg" alt="course-img" className="rounded-t-lg overflow-hidden" />
                        <div className="space-y-3 p-4">
                            <h1 className="text-xl font-semibold font-inter">Microsoft Excel: Beginner to Advanced LIVE Crash Course</h1>
                            <div className="flex items-center justify-start gap-5">
                                <div className="bg-[#BBDDF4] px-2.5 flex items-center gap-2 rounded-lg py-1">
                                    <FaCirclePlay className="text-second bg-white rounded-full text-[15px]"></FaCirclePlay>
                                    <span className="font-semibold text-second text-[15px]">40 Lessons</span>
                                </div>
                                <div className="bg-[#BBDDF4] px-2.5 py-1 flex items-center gap-2 rounded-lg">
                                    <BsClock className="text-second text-[15px]"></BsClock>
                                    <span className="text-[15px] font-medium text-second">240 Hour</span>
                                </div>                                
                            </div>  
                            <div>
                                <button className="px-6 py-2 mt-1 bg-primary text-white font-semibold rounded-xl">Enroll Now</button>  
                            </div>                        
                        </div>
                    </Link>                    
                </SwiperSlide>
                <SwiperSlide>
                    <Link to="" className="border border-[#46A3E1] rounded-xl overflow-hidden text-left">
                        <img src="https://i.ibb.co/3RMT44t/excel-live-crash-course-thumbnail.jpg" alt="course-img" className="rounded-t-lg overflow-hidden" />
                        <div className="space-y-3 p-4">
                            <h1 className="text-xl font-semibold font-inter">Microsoft Excel: Beginner to Advanced LIVE Crash Course</h1>
                            <div className="flex items-center justify-start gap-5">
                                <div className="bg-[#BBDDF4] px-2.5 flex items-center gap-2 rounded-lg py-1">
                                    <FaCirclePlay className="text-second bg-white rounded-full text-[15px]"></FaCirclePlay>
                                    <span className="font-semibold text-second text-[15px]">40 Lessons</span>
                                </div>
                                <div className="bg-[#BBDDF4] px-2.5 py-1 flex items-center gap-2 rounded-lg">
                                    <BsClock className="text-second text-[15px]"></BsClock>
                                    <span className="text-[15px] font-medium text-second">240 Hour</span>
                                </div>                                
                            </div>  
                            <div>
                                <button className="px-6 py-2 mt-1 bg-primary text-white font-semibold rounded-xl">Enroll Now</button>  
                            </div>                        
                        </div>
                    </Link>                    
                </SwiperSlide>
                <SwiperSlide>
                    <Link to="" className="border border-[#46A3E1] rounded-xl overflow-hidden text-left">
                        <img src="https://i.ibb.co/3RMT44t/excel-live-crash-course-thumbnail.jpg" alt="course-img" className="rounded-t-lg overflow-hidden" />
                        <div className="space-y-3 p-4">
                            <h1 className="text-xl font-semibold font-inter">Microsoft Excel: Beginner to Advanced LIVE Crash Course</h1>
                            <div className="flex items-center justify-start gap-5">
                                <div className="bg-[#BBDDF4] px-2.5 flex items-center gap-2 rounded-lg py-1">
                                    <FaCirclePlay className="text-second bg-white rounded-full text-[15px]"></FaCirclePlay>
                                    <span className="font-semibold text-second text-[15px]">40 Lessons</span>
                                </div>
                                <div className="bg-[#BBDDF4] px-2.5 py-1 flex items-center gap-2 rounded-lg">
                                    <BsClock className="text-second text-[15px]"></BsClock>
                                    <span className="text-[15px] font-medium text-second">240 Hour</span>
                                </div>                                
                            </div>  
                            <div>
                                <button className="px-6 py-2 mt-1 bg-primary text-white font-semibold rounded-xl">Enroll Now</button>  
                            </div>                        
                        </div>
                    </Link>                    
                </SwiperSlide>
                <SwiperSlide>
                    <Link to="" className="border border-[#46A3E1] rounded-xl overflow-hidden text-left">
                        <img src="https://i.ibb.co/3RMT44t/excel-live-crash-course-thumbnail.jpg" alt="course-img" className="rounded-t-lg overflow-hidden" />
                        <div className="space-y-3 p-4">
                            <h1 className="text-xl font-semibold font-inter">Microsoft Excel: Beginner to Advanced LIVE Crash Course</h1>
                            <div className="flex items-center justify-start gap-5">
                                <div className="bg-[#BBDDF4] px-2.5 flex items-center gap-2 rounded-lg py-1">
                                    <FaCirclePlay className="text-second bg-white rounded-full text-[15px]"></FaCirclePlay>
                                    <span className="font-semibold text-second text-[15px]">40 Lessons</span>
                                </div>
                                <div className="bg-[#BBDDF4] px-2.5 py-1 flex items-center gap-2 rounded-lg">
                                    <BsClock className="text-second text-[15px]"></BsClock>
                                    <span className="text-[15px] font-medium text-second">240 Hour</span>
                                </div>                                
                            </div>  
                            <div>
                                <button className="px-6 py-2 mt-1 bg-primary text-white font-semibold rounded-xl">Enroll Now</button>  
                            </div>                        
                        </div>
                    </Link>                    
                </SwiperSlide>
            </Swiper>
        </div>
           
       
    );
};

export default TrendingCourse;