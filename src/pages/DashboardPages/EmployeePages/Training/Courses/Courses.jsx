import { Link, useParams } from "react-router-dom";
import useCourses from "../../../../../hooks/useCourses";
import { FaCirclePlay } from "react-icons/fa6";
import { BsClock } from "react-icons/bs";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../../../Provider/AuthProvider";
import toast from "react-hot-toast";

const Courses = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useContext(AuthContext)
    const [courses] = useCourses()
    const {category} = useParams()
    const catCourse = courses?.filter(course => course.slag === category)
    
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
           }
        })
        .catch(error =>{
            console.log(error.message)
        })        
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {
                catCourse?.length > 0 ?
                catCourse?.map(course => (
                    <Link to={`/course/${course._id}`} key={course?._id} className="border border-second rounded-xl overflow-hidden h-[430px]">
                        <img src={course?.image} alt="course-img" className="rounded-t-lg overflow-hidden h-[150px]"/>
                        <div className="font-inter p-4 flex flex-col justify-between" style={{height: 'calc(430px - 150px)'}}>
                            <div className="space-y-3">
                                <h1 className="text-xl font-bold">{course?.title}</h1>
                                <div className="space-y-3">
                                    <div>
                                        <div className="bg-[#BBDDF4] px-2.5 py-1 inline-flex items-center gap-2 rounded-lg">
                                            <FaCirclePlay className="text-second text-sm bg-white rounded-full"></FaCirclePlay>
                                            <h1 className="text-sm font-medium text-second">40 Lessons</h1>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="bg-[#BBDDF4] px-2.5 py-1 inline-flex items-center gap-2 rounded-lg">
                                            <BsClock className="text-second text-sm "></BsClock>
                                            <h1 className="text-sm font-medium text-second">240 Hour</h1>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                            <button onClick={() => handlePost(course)} className="px-4 py-2 bg-primary text-white font-semibold text-base rounded-xl">Enroll Now</button>
                        </div>
                    </Link>
                ))
                :
                courses?.map(course => (
                    <Link to={`/course/${course._id}`} key={course?._id} className="border border-second rounded-xl overflow-hidden h-[430px]">
                        <img src={course?.image} alt="course-img" className="rounded-t-lg overflow-hidden h-[150px]" />
                        <div className="font-inter p-4 flex flex-col justify-between" style={{height: 'calc(430px - 150px)'}}>
                            <div className="space-y-3">
                                <h1 className="text-xl font-bold">{course?.title}</h1>
                                <div className="space-y-3">
                                    <div>
                                        <div className="bg-[#BBDDF4] px-2.5 py-1 inline-flex items-center gap-2 rounded-lg">
                                            <FaCirclePlay className="text-second text-sm bg-white rounded-full"></FaCirclePlay>
                                            <h1 className="text-sm font-medium text-second">40 Lessons</h1>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="bg-[#BBDDF4] px-2.5 py-1 inline-flex items-center gap-2 rounded-lg">
                                            <BsClock className="text-second text-sm "></BsClock>
                                            <h1 className="text-sm font-medium text-second">240 Hour</h1>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                            <button onClick={() => handlePost(course)} className="px-4 py-2 bg-primary text-white font-semibold text-base rounded-xl">Enroll Now</button>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
};

export default Courses;