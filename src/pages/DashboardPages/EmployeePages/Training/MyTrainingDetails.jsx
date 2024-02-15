import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import useMyCourses from "../../../../hooks/useMyCourses";
import { useParams } from "react-router-dom";

const MyTrainingDetails = () => {
    const [my_course] = useMyCourses()
    const {id} = useParams()
    const currentCourse = my_course?.find(course => course?.uniqueID._id === id)
    const [currentModule, setCurrentModule] = useState()

    useEffect(() => {
        setCurrentModule(currentCourse?.uniqueID?.course_content[0])
    }, [currentCourse])
    console.log(currentCourse);

    return (
        <div className="py-10">
            <div className="grid grid-cols-5 gap-5">
                <div className="col-span-3">
                    <iframe width="100%" height="420" className="rounded-xl" src={currentModule?.link} frameBorder="0" allow="autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <h2 className="mt-5 font-semibold text-2xl">
                        {currentModule?.title}
                    </h2>
                </div>
                <div className="col-span-2">
                    <div className="border-2 rounded-xl space-y-5 p-3 bg-[#ececf8]">
                        {/* <div className="bg-white p-4 rounded-lg">
                            <h2 className="font-semibold text-base mb-2">Your Progress</h2>
                            <ProgressBar
                                completed={90}
                                bgColor="#433ebe"
                                height="13px"
                                baseBgColor="#e3e2f5"
                                labelColor="#ffffff"
                                labelSize="12px"
                                maxCompleted={100}
                                animateOnRender
                            />
                        </div> */}
                        <div className="collapse collapse-arrow bg-white">
                            <input type="radio" name="my-accordion-2" /> 
                            <div className="collapse-title border-b text-xl font-medium">
                                {currentCourse?.CourseTitle}
                            </div>
                            <div className="collapse-content space-y-2 pt-3"> 
                                {
                                    currentCourse?.uniqueID?.course_content?.map((content, idx) => (
                                        <div key={idx} className="bg-[#ececf8] rounded-lg px-3 py-1 flex gap-2 items-center cursor-pointer" onClick={() => setCurrentModule(content)}>
                                            < MdOutlinePlayCircleFilled className="text-primary" />
                                            <span>{content?.title}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <button className="bg-primary text-white font-inter font-semibold rounded-lg w-full py-3 transition-all hover:scale-105">Complete Course</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MyTrainingDetails;