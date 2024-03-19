import { Link } from "react-router-dom";
import useMyCourses from "../../../../hooks/useMyCourses";
import { FaCirclePlay } from "react-icons/fa6";
import { BsClock } from "react-icons/bs";
import { GoCheckCircleFill } from "react-icons/go";
import { MdCancel } from "react-icons/md";

const CompletedCourses = () => {
  const [my_course] = useMyCourses("Completed");
  return (
    <>
      <div className="mt-10">
        <div className="flex flex-wrap gap-5">
          {my_course.length > 0 ? (
            my_course?.map((info) => (
              <div key={info?._id}>
                <div className="border-2 border-[#46A3E1] rounded-xl overflow-hidden w-full md:w-[305px]">
                  <img
                    src={info?.uniqueID?.image}
                    alt="course-img"
                    className="rounded-t-lg w-full overflow-hidden"
                  />
                  <div className="space-y-5 flex flex-col p-4">
                    <div>
                      <h1 className="text-xl font-bold">
                        {info?.uniqueID?.title}
                      </h1>
                      <div className="flex items-center justify-between gap-2 mt-4 text-lg font-medium text-[#46A3e1]">
                        <div className="bg-[#BBDDF4] px-2.5  flex items-center gap-2 rounded-lg">
                          <FaCirclePlay className=" bg-white rounded-full"></FaCirclePlay>
                          <h1>40 Lessons</h1>
                        </div>
                        <div className="bg-[#BBDDF4] px-2.5 flex items-center gap-2 rounded-lg">
                          <BsClock></BsClock>
                          <h1>240 Hour</h1>
                        </div>
                      </div>
                    </div>
                    <div className="top-auto flex items-center justify-between">
                      <div className="inline-flex items-center font-inter font-medium gap-1 text-green-600 bg-green-100 rounded-lg py-1 px-2 !text-left">
                        <GoCheckCircleFill className="text-md" />
                        Completed
                      </div>
                      {/* <div className="inline-flex items-center font-inter font-medium gap-1 text-red-600 bg-red-100 rounded-lg py-1 px-2 !text-left">
                        <MdCancel className="text-lg" />
                        Delete
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {my_course.length === 0 && (
        <div>
          <div className="flex justify-center items-center my-10">
            <img
              src="https://i.ibb.co/w6RkCpg/not-found.gif"
              alt="not found gif"
              className="w-60"
            />
          </div>
          <h1 className="text-center text-3xl font-inter font-semibold">
            You have not enrolled the course yet
          </h1>
          <div className="text-center pt-10">
            <Link
              className="bg-primary text-white font-inter py-2 px-4 rounded-lg text-lg  "
              to="/dashboard/training"
            >
              Select Course
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CompletedCourses;
