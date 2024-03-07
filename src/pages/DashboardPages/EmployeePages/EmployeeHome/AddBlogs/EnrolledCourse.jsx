import ProgressBar from "@ramonak/react-progress-bar";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";

const EnrolledCourse = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold my-3">Enrolled Course</h2>
      {/* main card */}
      <div className="border-2 border-[#46A3E1] bg-[#EDF6FC] rounded-xl px-2 md:px-5 py-2  hover:cursor-pointer  w-[449px] h-[159px]">
        <h1 className="text-lg font-bold my-3">Python with Komola Khala</h1>
        <ProgressBar
          completed={70}
          bgColor="#46A3E1"
          height="14px"
          baseBgColor="#C4E2F6"
          labelColor="#ffffff"
          labelSize="12px"
          maxCompleted={100}
          animateOnRender
          className="my-3"
        ></ProgressBar>

        <div className="flex items-center justify-start gap-5 mt-4">
          <button className="bg-[#BBDDF4] px-4 py-1 flex items-center gap-2 rounded-lg">
            <FaCirclePlay className="text-[#46A3e1] text-xl bg-white rounded-full"></FaCirclePlay>
            <h1 className="text-xl font-medium text-[#46A3e1]">40 Lessons</h1>
          </button>
          <button className="bg-[#B7E1B7] px-4 py-1 flex items-center gap-2 rounded-lg">
            <FaCircleCheck className="text-[#38B000] bg-white rounded-full text-xl"></FaCircleCheck>
            <h1 className="text-xl font-medium text-[#38B000]">40 Lessons</h1>
          </button>
        </div>
      </div>
      {/* main card */}
    </div>
  );
};

export default EnrolledCourse;
