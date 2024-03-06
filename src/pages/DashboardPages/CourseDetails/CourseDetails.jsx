import { BiSupport } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import useCourses from "../../../hooks/useCourses";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext } from "react";
import { toast } from 'sonner';

const CourseDetails = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useContext(AuthContext)
    const [courses] = useCourses()
    const {id} = useParams()
    const course = courses?.find(course => course?._id == id)
    const {title, intro, instructor_name, instructor_image, instructor_bio, description, course_feature, benefits} = course || {}

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
        <div className="py-10 max-w-[92%] lg:max-w-[1200px] mx-auto">
            
            <div className="grid grid-cols-3 gap-8 relative">
                <div className="space-y-5 md:sticky md:top-[100px]">
                    <div className="border rounded-lg">
                        <iframe width="100%" height="200" className="rounded-t-xl" src={intro} frameBorder="0" allow="autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>    
                        <div className="p-4 space-y-3">
                            <h2 className="font-semibold text-xl">{title}</h2>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <FaCirclePlay className="text-second"></FaCirclePlay>
                                    <h6 className="font-medium">240 Video</h6>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BsClock className="text-second"></BsClock>
                                    <h6 className="font-medium">240 Hour</h6>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BiSupport className="text-second"></BiSupport>
                                    <h6 className="font-medium">Support from Senior Developer</h6>
                                </div>
                            </div>
                            <button onClick={() => handlePost(course)} className="bg-primary text-white font-inter font-semibold rounded-lg px-4 py-2 transition-all hover:scale-105">Enroll Now</button>                    
                        </div>            
                    </div>                
                    <div>
                        <h3 className="text-xl font-semibold">Course Instructor</h3>
                        <div className="border rounded-lg p-2 grid grid-cols-5 gap-3 mt-2">
                            <img src={instructor_image} className="w-12 h-12 rounded-full" alt="" />
                            <div className="col-span-4">
                                <h3 className="text-lg font-inter font-medium">{instructor_name}</h3>
                                <h4>{instructor_bio}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 space-y-3">
                    <h2 className="text-3xl font-semibold leading-normal">{title}</h2>
                    <p className="font-medium font-itner">{description}</p>
                    <h3 className="text-xl font-semibold">What you will learn</h3>
                    <div className="grid grid-cols-2 gap-2.5 border rounded-lg p-5">
                        {
                            course_feature?.map((feature, idx) => (
                                <div key={idx} className="flex gap-2 items-center">
                                    <FaCheck className="text-primary" />
                                    <span className="font-inter font-medium">{feature?.name}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="pt-3">
                        <h3 className="text-xl font-semibold">What you will get</h3>
                        <div className="space-y-2.5 mt-3 border p-5 rounded-lg">
                            {
                                benefits?.map((benefit, idx) => (
                                    <div key={idx} className="flex gap-2 items-center">
                                        <FaCheck className="text-primary" />
                                        <span className="font-inter font-medium">{benefit?.name}</span>
                                    </div>
                                ))
                            }
                            <div className="flex gap-2 items-center">
                                <FaCheck className="text-primary" />
                                <span className="font-inter font-medium"> একটি সার্টিফিকেট পাবেন</span>
                            </div>
                            <div>
                                <img src="https://i.ibb.co/MfQMrcG/updated3-Certificate-Web-Design.jpg" className="border rounded-lg mt-5" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>    

        </div>
    );
};

export default CourseDetails;