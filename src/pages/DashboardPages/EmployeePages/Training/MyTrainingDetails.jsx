// import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import useMyCourses from "../../../../hooks/useMyCourses";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { GoCheckCircleFill } from "react-icons/go";

const MyTrainingDetails = () => {
  const [my_course, refetch] = useMyCourses();
  const { id } = useParams();
  console.log(id);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const statusId = location?.state;
  const currentCourse = my_course?.find((course) => course._id === statusId);
  const [currentModule, setCurrentModule] = useState(0);

  useEffect(() => {
    setCurrentModule(0);
  }, [currentCourse]);
  console.log(currentCourse);

  // handleNextModule
  const handleNextModule = () => {
    if (currentModule < currentCourse?.uniqueID?.course_content.length - 1) {
      setCurrentModule((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousModule = () => {
    if (currentModule > 0) {
      setCurrentModule((prevIndex) => prevIndex - 1);
    }
  };

  const hanleCompleteCourse = () => {
    axiosPublic
      .put(`/course_status_update/${statusId}`, { status: "Completed" })
      .then((res) => {
        if (res?.data) {
          toast.success(
            `${currentCourse?.uniqueID?.course_content[currentModule]?.title} Course Completed`
          );
          refetch();
        }
      });
  };

  return (
    <div className="py-10 max-w-[92%] lg:max-w-[1200px] mx-auto">
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-5 lg:col-span-3">
          <iframe
            width="100%"
            height="420"
            className="rounded-xl"
            src={currentCourse?.uniqueID?.course_content[currentModule]?.link}
            frameBorder="0"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <h2 className="mt-5 font-semibold text-2xl">
            {currentCourse?.uniqueID?.course_content[currentModule]?.title}
          </h2>
          <div className="flex justify-start items-center gap-5 mt-3">
            <button onClick={handlePreviousModule} className="nbtn-fixed-bg">
              Previous
            </button>
            <button onClick={handleNextModule} className="nbtn-fixed-bg">
              Next
            </button>
          </div>
        </div>
        <div className="col-span-5 lg:col-span-2">
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
                {currentCourse?.uniqueID?.course_content?.map(
                  (content, idx) => (
                    <div
                      key={idx}
                      className="bg-[#ececf8] rounded-lg px-3 py-1 flex gap-2 items-center cursor-pointer"
                      onClick={() => setCurrentModule(idx)}
                    >
                      <MdOutlinePlayCircleFilled className="text-primary" />
                      <span>{content?.title}</span>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              {currentCourse?.CourseStatus === "Completed" ? (
                <button className="nbtn-fixed-bg w-full transition-all hover:scale-105 inline-flex items-center gap-2 justify-center">
                  <GoCheckCircleFill />
                  Completed
                </button>
              ) : (
                <button
                  onClick={() => hanleCompleteCourse()}
                  className="nbtn-fixed-bg w-full transition-all hover:scale-105"
                >
                  Complete Course
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTrainingDetails;
