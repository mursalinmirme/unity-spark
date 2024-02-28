import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AttendanceSkeleton from "./AttendanceSkeleton";

const Attendance = () => {
  const [weekName, setWeekName] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentHour, setCurrentHour] = useState(0);
  const [todayDate, setTodayDate] = useState(0);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { data: employeeInfo = {}, isFetching } = useQuery({
    queryKey: ["getEmployeeDetail"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/${user?.email}`);
      return result.data;
    },
  });
  console.log("The employee result is", employeeInfo);
  // check employees todays presentation update
  const { data: presentStatus, refetch: presentStatusRefetch } = useQuery({
    queryKey: ["getPresentationStatus"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/presentation/${user?.email}`);
      return result.data?.presentedAt;
    },
  });
  // check total presentation of the employer employees
  const { data: totalPresentation = [], refetch: totalPresentationRefetch } =
    useQuery({
      queryKey: ["getTotalPresentation"],
      queryFn: async () => {
        const result = await axiosPublic.get(
          `/presentation?email=${user?.email}`
        );
        return result.data;
      },
    });
  useEffect(() => {
    const today = new Date();
    const options = { weekday: "long" };
    const currentWeekName = today.toLocaleDateString("en-US", options);
    let hours = today.getHours();
    setCurrentHour(hours);
    setTodayDate(today.getDate());
    const minutes = today.getMinutes();
    const meridiem = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${meridiem}`;
    setWeekName(currentWeekName);
    setCurrentTime(formattedTime);
  }, []);
  console.log("The current hours is", currentHour);
  const handlePresent = () => {
    axiosPublic
      .post(`/presentation`, { name: user?.displayName, email: user?.email })
      .then((res) => {
        console.log("presentation res is", res.data);
        presentStatusRefetch();
        totalPresentationRefetch();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  // const makeSlice = presentStatus.join('-')

  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-[#1E1E1E]">
        Employee Attendance Tracker
      </h1>
      <h1 className="text-center text-lg font-semibold text-[#1E1E1E] mt-2 mb-5">
        Mark Your Attendance - 9 AM to 10.59 AM
      </h1>
      {isFetching ? (
        <AttendanceSkeleton></AttendanceSkeleton>
      ) : (
        <div className="border-2 border-[#D9D9D9] px-7 py-12 rounded-md space-y-6 w-full">
          <div>
            <img
              src={employeeInfo?.image}
              alt="pp"
              className="w-24 h-24 object-cover rounded-full mx-auto"
            />
          </div>
          <h2 className="text-2xl font-semibold text-center">
            {employeeInfo?.name}
          </h2>
          <div className="mt-0 space-y-4">
            <p className="text-lg  md:text-xl font-medium text-center">
              {employeeInfo?.email}
            </p>
            <div className="flex flex-col md:flex-row justify-center md:gap-10 space-y-2 md:space-y-0">
              <p className="text-center text-xl font-medium">
                <span className="font-semibold">Day:</span> {weekName}{" "}
              </p>
              <p className="text-center text-xl font-medium">
                <span className="font-semibold">Time:</span> {currentTime}
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:gap-10 space-y-2 md:space-y-0">
              <p className="text-center text-xl font-medium">
                <span className="font-semibold">Total Presented:</span>{" "}
                {totalPresentation?.total} day{" "}
              </p>
              <p className="text-center text-xl font-medium">
                <span className="font-semibold">Today Presented:</span>{" "}
                {new Date(presentStatus)?.getDate() === todayDate ? (
                  <span className="text-green-600">Confirmed</span>
                ) : (
                  <span className="text-red-600">
                    {currentHour === 9 || currentHour === 10
                      ? "Not given Yet"
                      : "Absence"}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div
            className={`flex gap-7 items-center justify-center ${
              currentHour === 9 || currentHour === 10 ? "visible" : "hidden"
            } ${new Date(presentStatus).getDate() === todayDate && "hidden"}`}
          >
            <button
              onClick={handlePresent}
              className="rounded-xl px-8 py-2 bg-[#433EBE] text-white font-semibold"
            >
              Present
            </button>
          </div>
          <div
            className={`flex gap-7 items-center justify-center ${
              new Date(presentStatus).getDate() === todayDate
                ? "visible"
                : "hidden"
            }`}
          >
            <button
              className={`rounded-xl px-8 py-2 bg-[#2fa95c] text-white font-semibold ${
                new Date(presentStatus)?.getDate() === todayDate
                  ? "block"
                  : "hidden"
              }`}
            >
              Presented
            </button>
            {/* <button className={`rounded-xl px-8 py-2 bg-red-600 text-white font-semibold ${new Date(presentStatus)?.getDate() !== todayDate ? 'block' : 'hidden'}`}>Absence</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
