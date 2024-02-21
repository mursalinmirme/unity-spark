import { RiUserFollowLine } from "react-icons/ri";
import { MdAddTask } from "react-icons/md";
import { IoDocumentOutline } from "react-icons/io5";
import { TbCalendarStar } from "react-icons/tb";
import RunningTaskCard from "./RunningTaskCard";
import CompletedTaskCard from "./CompletedTaskCard";
import RegisteredEvents from "./RegisteredEvents";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import EnrolledCourse from "./AddBlogs/EnrolledCourse";

const EmployeeHome = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: EmployeeReqEvent = [] } = useQuery({
    queryKey: ["EmployeeReqEvent"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/reqEvents/${user?.email}`);
      return response?.data;
    },
  });

  const { data: totalAttendance } = useQuery({
    queryKey: ["totalAttendance"],
    queryFn: async () => {
      const result = await axiosPublic.get(`total-attendance/${user?.email}`);
      return result.data;
    },
  });

  
  // get running task of the loged in employee
  const {
    data: myTotalCompletedTaskCount = {}
  } = useQuery({
    queryKey: ["myTotalCompletedTaskCount"],
    queryFn: async () => {
      const result = await axiosPublic.get(
        `/my-total-task-completed/${user?.email}`
      );
      return result.data;
    },
  });

  const { data: myTotalEnrolledCourses } = useQuery({
    queryKey: ["myTotalEnrolledCourses"],
    queryFn: async () => {
      const result = await axiosPublic.get(`enrolled_course_length/${user?.email}`);
      return result?.data;
    },
  });

  return (
    <div>
      <div className="text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 border-b-4 pb-5">
        {/* Total Present */}
        <div className="font-inter bg-[#C7C5EB] py-4 rounded-xl">
          <div className="flex justify-center">
            <RiUserFollowLine className="w-12 h-12 text-[#433EBE]"></RiUserFollowLine>
          </div>
          <p className="font-bold text-[45px] text-[#433EBE]">
            {totalAttendance?.length}
          </p>
          <p className="text-[#433EBE] font-semibold text-xl">
            Total Present Day
          </p>
        </div>

        {/* Event Joined */}
        <div className="font-inter bg-[#46A3E14D] py-4 rounded-xl">
          <div className="flex justify-center">
            <TbCalendarStar className="w-12 h-12 text-[#46A3E1]"></TbCalendarStar>
          </div>
          <p className="font-bold text-[45px] text-[#46A3E1]">
            {EmployeeReqEvent.length}
          </p>
          <p className="text-[#46A3E1] font-semibold text-xl">Events Joined</p>
        </div>

        {/* Task Completed */}
        <div className="font-inter bg-[#7209B74D] py-4 rounded-xl">
          <div className="flex justify-center">
            <MdAddTask className="w-12 h-12 text-[#7209B7]"></MdAddTask>
          </div>
          <p className="font-bold text-[45px] text-[#7209B7]">
            {myTotalCompletedTaskCount?.count}
          </p>
          <p className="text-[#7209B7] font-semibold text-xl">
            Tasks Completed
          </p>
        </div>

        {/* Job Posts */}
        <div className="font-inter bg-[#4361EE4D] py-4 rounded-xl">
          <div className="flex justify-center">
            <IoDocumentOutline className="w-12 h-12 text-[#4361EE]"></IoDocumentOutline>
          </div>
          <p className="font-bold text-[45px] text-[#4361EE]">{myTotalEnrolledCourses?.count}</p>
          <p className="text-[#4361EE] font-semibold text-xl">Course Enrolled</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
        <RunningTaskCard></RunningTaskCard>
        <CompletedTaskCard></CompletedTaskCard>
      </div>
      <RegisteredEvents EmployeeReqEvent={EmployeeReqEvent}></RegisteredEvents>
      {/* <EnrolledCourse></EnrolledCourse> */}
    </div>
  );
};

export default EmployeeHome;
