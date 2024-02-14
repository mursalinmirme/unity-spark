import { useContext, useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import { FaCirclePlay } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "./trendingcourse.css"
import { Navigation } from 'swiper/modules';
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useCourses from "../../../../hooks/useCourses";

const TrendingCourse = () => {
    const {user} = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [courses] = useCourses()
    
   useEffect(() => {
      const handleResize = () => {
          setScreenSize(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);
  
    const handlePost = (data) =>{
        
        const MyCourse = {
            uniqueID: data?._id,
            userEmail: user?.email,
            CourseTitle: data?.title,
            CourseBanner: data?.image
        }
        axiosPublic.post("/my_course" , MyCourse)
        .then(res =>{
           if(res?.data){
            toast.success("Course Added to My Course")
            console.log(res?.data)
           }
        })
        .catch(error =>{
            console.log(error.message)
        })

        
    }
    return (
        <>
        <h1 className="my-5 font-semibold text-xl">Trending Course</h1>
         <Swiper  slidesPerView={screenSize < 768 ? 1  : 2}
        spaceBetween={30} navigation={true} modules={[Navigation]} className="mySwiper courseSwiper  my-10">
        
           { courses?.map(allData => <SwiperSlide key={allData._id}>
                 <div className="  border-2 border-[#46A3E1] rounded-xl overflow-hidden">
                <img src={allData?.image} alt="course-img" className="rounded-t-lg overflow-hidden" />
                <div className="space-y-5 p-4">
                    <h1 className="text-2xl font-bold">{allData?.title}</h1>
                    <div className="flex items-center justify-start gap-5 mt-4">
                            <button className="bg-[#BBDDF4] px-2.5  flex items-center gap-2 rounded-lg">
                               <FaCirclePlay className="text-[#46A3e1] text-lg bg-white rounded-full"></FaCirclePlay>
                               <h1 className="text-lg font-medium text-[#46A3e1]">40 Lessons</h1>
                            </button>
                            <button className="bg-[#BBDDF4] px-2.5 flex items-center gap-2 rounded-lg">
                               <BsClock className="text-[#46A3e1] text-lg "></BsClock>
                               <h1 className="text-lg font-medium text-[#46A3e1]">240 Hour</h1>
                            </button>
                            
                        </div>

                        <button onClick={() => handlePost(allData)} className="px-6 py-3 bg-[#433EBE] text-white font-semibold text-xl rounded-xl">Enroll Now</button>
                </div>
              </div>
             </SwiperSlide>)}
        </Swiper>
        </>
  
           
       
    );
};

export default TrendingCourse;