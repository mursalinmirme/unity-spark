import { useContext, useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import { FaCirclePlay } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./trendingcourse.css";
import { Navigation } from "swiper/modules";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { toast } from "sonner";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useCourses from "../../../../hooks/useCourses";

const TrendingCourse = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [courses] = useCourses();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePost = (data) => {
    const MyCourse = {
      uniqueID: data?._id,
      userEmail: user?.email,
      CourseTitle: data?.title,
      CourseBanner: data?.image,
      CourseStatus: "Pending",
    };
    axiosPublic
      .post("/my_course", MyCourse)
      .then((res) => {
        if (res?.data) {
          toast.success("Course Added to My Course");
          console.log(res?.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <Swiper
        slidesPerView={
          screenSize < 768
            ? 1
            : screenSize < 1024
            ? 2
            : screenSize < 1040
            ? 2
            : 3
        }
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper courseSwiper"
      >
        <h1 className="font-semibold text-2xl absolute top-5">
          Trending Course
        </h1>
        {courses?.map((allData) => (
          <SwiperSlide key={allData._id}>
            <div className="border-2 border-[#46A3E1] rounded-xl w-96">
              <img
                src={allData?.image}
                alt="course-img"
                className="rounded-t-lg h-[228px] w-[408px]"
              />
              <div className="space-y-5 p-4">
                <h1 className="text-xl text-left font-bold">
                  {allData?.title}
                </h1>
                <div className="flex items-center justify-between gap-3 text-lg font-medium text-[#46A3e1]">
                  <button className="bg-[#BBDDF4] px-2.5  flex items-center gap-1 rounded-lg">
                    <FaCirclePlay className="bg-white rounded-full"></FaCirclePlay>
                    <h1>40 Lessons</h1>
                  </button>
                  <button className="bg-[#BBDDF4] px-2.5 flex items-center gap-1 rounded-lg">
                    <BsClock></BsClock>
                    <h1>240 Hour</h1>
                  </button>
                </div>
                <div className="text-left">
                  <button
                    onClick={() => handlePost(allData)}
                    className="nbtn-fixed-bg"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TrendingCourse;
