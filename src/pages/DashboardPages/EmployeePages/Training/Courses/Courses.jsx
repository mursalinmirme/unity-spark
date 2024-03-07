import { Link, useParams } from "react-router-dom";
import useCourses from "../../../../../hooks/useCourses";
import { FaCirclePlay } from "react-icons/fa6";
import { BsClock } from "react-icons/bs";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../../../Provider/AuthProvider";
import { toast } from "sonner";

const Courses = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [courses] = useCourses();
  const { category } = useParams();
  const catCourse = courses?.filter((course) => course.slag === category);
  console.log(catCourse);
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
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className="flex flex-wrap gap-5">
        {catCourse?.length > 0 ? (
          catCourse?.map((course) => (
            <Link
              to={`/course/${course._id}`}
              key={course?._id}
              className="border border-second rounded-xl overflow-hidden w-full md:w-[305px]"
            >
              <img
                src={course?.image}
                alt="course-img"
                className="rounded-t-lg overflow-hidden w-full"
              />
              <div className="font-inter p-4">
                <div className="space-y-3">
                  <h1 className="text-xl font-bold">{course?.title}</h1>
                  <div className="flex items-center justify-between">
                    <div className="bg-[#BBDDF4] px-2.5 py-1 inline-flex items-center gap-2 rounded-lg">
                      <FaCirclePlay className="text-second text-sm bg-white rounded-full"></FaCirclePlay>
                      <h1 className="text-sm font-medium text-second">
                        40 Lessons
                      </h1>
                    </div>
                    <div className="bg-[#BBDDF4] px-2.5 py-1 inline-flex items-center gap-2 rounded-lg">
                      <BsClock className="text-second text-sm "></BsClock>
                      <h1 className="text-sm font-medium text-second">
                        240 Hour
                      </h1>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePost(course)}
                    className="nbtn-fixed-bg"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : category === "all" ? (
          courses?.map((course) => (
            <Link
              to={`/course/${course._id}`}
              key={course?._id}
              className="border border-second rounded-xl overflow-hidden w-full md:w-[305px]"
            >
              <img
                src={course?.image}
                alt="course-img"
                className="rounded-t-lg overflow-hidden w-full"
              />
              <div className="font-inter p-4">
                <div className="space-y-3">
                  <h1 className="text-xl font-bold">{course?.title}</h1>
                  <div className="flex justify-between items-center">
                    <div className="bg-[#BBDDF4] px-2.5 py-1 inline-flex items-center gap-2 rounded-lg">
                      <FaCirclePlay className="text-second text-sm bg-white rounded-full"></FaCirclePlay>
                      <h1 className="text-sm font-medium text-second">
                        40 Lessons
                      </h1>
                    </div>
                    <div className="bg-[#BBDDF4] px-2.5 py-1 inline-flex items-center gap-2 rounded-lg">
                      <BsClock className="text-second text-sm "></BsClock>
                      <h1 className="text-sm font-medium text-second">
                        240 Hour
                      </h1>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePost(course)}
                    className="nbtn-fixed-bg"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div></div>
        )}
      </div>
      {catCourse.length === 0 && category !== "all" ? (
        <div>
          <div className="flex justify-center items-center w-full my-10">
            <img
              src="https://i.ibb.co/w6RkCpg/not-found.gif"
              alt="not found gif"
              className="w-60"
            />
          </div>
          <h1 className="text-center text-3xl font-inter font-semibold">
            No content available in this section{" "}
          </h1>
          <div className="text-center pt-10">
            <Link
              className="bg-primary text-white font-inter py-2 px-4 rounded-lg text-lg  "
              to="/dashboard/training"
            >
              Go Back
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Courses;
