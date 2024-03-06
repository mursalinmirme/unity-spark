import { useContext, useState } from "react";
import "./profile.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { FiEdit3 } from "react-icons/fi";
import { GoThumbsup } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import EmployeeProfileEdit from "./EmployeeProfileEdit";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const MyProfile = () => {
  const [isActive, setIsActive] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  const [performancePagValue, setPerformancePagValue] = useState(7);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data = {}, isFetching } = useQuery({
    queryKey: ["user_data"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  // get total Attendance
  const { data: totalAttendance = [], isFetching:isFetchingTotalAttendance } = useQuery({
    queryKey: ["totalAttendance", performancePagValue],
    queryFn: async () => {
      const res = await axiosSecure.get(`/total-attendance?email=${user?.email}&pegDays=${performancePagValue}`);
      return res.data;
    },
  });

  // console.log(totalAttendance);

  // get total Rest Days
  const { data: totalRest = [], isFetching:isFetchingTotalRest } = useQuery({
    queryKey: ["totalRest", performancePagValue],
    queryFn: async () => {
      const res = await axiosSecure.get(`/total-rest?email=${user?.email}&pegDays=${performancePagValue}}`);
      const sumNumberOfDays = res.data?.reduce((total, current) => {
        return total + parseInt(current.numberOfDays);
      }, 0);
      console.log("aye aye result mil gaya", sumNumberOfDays);
      return sumNumberOfDays;
    },
  });
  

  // console.log("ceched55", totalRest);

  const dbDate = new Date(data?.createdAt);
  // console.log(dbDate);
  const currentDate = new Date();

  const distanceDate = currentDate - dbDate;

  function millisecondsToDays(milliseconds) {
    const seconds = milliseconds / 1000;
    const days = seconds / (60 * 60 * 24);
    return days;
  }

  const days = millisecondsToDays(distanceDate);

  // console.log("check66", days.toFixed());
  // handle performance pagination
  const handlePerformanceTab = (tabValue) => {
    // console.log(tabValue);
    setPerformancePagValue(null);
    setPerformancePagValue(tabValue);
  }
  const tabs = [
    {
      name: "1w",
      value: 7,
      id: 0,
    },
    {
      name: "2w",
      value: 14,
      id: 1,
    },
    {
      name: "1m",
      value: 30,
      id: 2,
    },
    {
      name: "1y",
      value: 365,
      id: 3,
    },
    {
      name: "All",
      value: days.toFixed(),
      id: 4,
    },
  ];
  console.log(performancePagValue);

  return (
    <div className="user_profile">
      <div className="user_profile_container">
        <img src={data?.image} alt="profile" className="hidden md:block" />
        <div className="flex justify-between items-center w-full md:hidden ">
          <img src={data?.image} alt="profile" className="md:hidden" />
          <div className="items-center space-y-2 block md:hidden">
            {openEditor ? (
              <a
                className={`flex items-center font-inter text-red-500 text-base gap-1 font-medium border-2 rounded-md border-red-500 px-2 py-0.5 cursor-pointer text-red hover:text-white hover:bg-red-500 transition-all`}
                onClick={() => setOpenEditor(false)}
              >
                <RxCross2 />
                <span>Cancel</span>
              </a>
            ) : (
              <a className={`edit_btn`} onClick={() => setOpenEditor(true)}>
                <FiEdit3 />
                <span>Edit Info</span>
              </a>
            )}
            <Link className="edit_btn" to="/dashboard/reviews">
              <GoThumbsup />
              <span>Give Review</span>
            </Link>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div>
            <h2>{data?.name}</h2>
            <h3>{data?.email}</h3>
            <ProgressBar
              completed={90}
              bgColor="#433ebe"
              height="12px"
              width="250px"
              baseBgColor="#e3e2f5"
              labelColor="#ffffff"
              labelSize="10px"
              maxCompleted={100}
              animateOnRender
            />
          </div>
          <div className="items-center gap-2 hidden md:flex">
            <Link className="edit_btn" to="/dashboard/reviews/add-review">
              <GoThumbsup className="text-lg" />
              <span>Give Review</span>
            </Link>
          </div>
        </div>
      </div>

      <hr className="my-6" />
      <div className="badge_container">
        <span>Web Developer</span>
        <span>Remote</span>
        <span>Full-time</span>
      </div>
      <div className={`tab_container ${openEditor ? "hidden" : "block"}`}>
        <div className="tab_div">
          <h2>Performance</h2>
          <div className="tabs">
            {tabs?.map((tab) => (
              <a
                key={tab.id}
                className={`tab_btn ${
                  performancePagValue === tab.value
                    ? "font-medium text-white bg-primary"
                    : "bg-transperant text-primary font-semibold"
                }`}
                onClick={() => handlePerformanceTab(tab.value)}
              >
                {tab.name}
              </a>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-t-2">
            <tr>
              <th>Attendance</th>
              <th>Rest Day</th>
              <th>Total Absent</th>
              <th>Employee From</th>
            </tr>
            <tr>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  totalAttendance?.length + " " + "Days"
                )}
              </td>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  totalRest + " " + "Days"
                )}
              </td>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  (performancePagValue > days.toFixed() ? days.toFixed() : performancePagValue) -
                  (totalAttendance?.length + totalRest) +
                  " " +
                  "Days"
                )}
              </td>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  days.toFixed() + " " + "Days"
                )}
              </td>
            </tr>
            <tr>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  totalAttendance?.length * 24 + " " + "Hours"
                )}
              </td>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  totalRest * 24 + " " + "Hours"
                )}
              </td>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  ((performancePagValue > days.toFixed() ? days.toFixed() : performancePagValue) -
                    (totalAttendance?.length + totalRest)) *
                    24 +
                  " " +
                  "Hours"
                )}
              </td>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  days.toFixed() * 24 + " " + "Hours"
                )}
              </td>
            </tr>
            <tr>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  totalAttendance?.length * 24 * 60 + " " + "Minutes"
                )}
              </td>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  totalRest * 24 * 60 + " " + "Minutes"
                )}
              </td>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  ((performancePagValue > days.toFixed() ? days.toFixed() : performancePagValue) -
                    (totalAttendance?.length + totalRest)) *
                    24 *
                    60 +
                  " " +
                  "Minutes"
                )}
              </td>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  days.toFixed() * 24 * 60 + " " + "Minutes"
                )}
              </td>
            </tr>
            <tr>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  totalAttendance?.length * 24 * 60 * 60 + " " + "Seconds"
                )}
              </td>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  totalRest * 24 * 60 * 60 + " " + "Seconds"
                )}
              </td>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  ((performancePagValue > days.toFixed() ? days.toFixed() : performancePagValue) -
                    (totalAttendance?.length + totalRest)) *
                    24 *
                    60 *
                    60 +
                  " " +
                  "Seconds"
                )}
              </td>
              <td>
                {isFetching || isFetchingTotalAttendance || isFetchingTotalRest ? (
                  <p className="skeleton w-32 h-5 mx-auto"></p>
                ) : (
                  days.toFixed() * 24 * 60 * 60 + " " + "Seconds"
                )}
              </td>
            </tr>
          </table>
        </div>
      </div>

      {/* EDITOR */}
      <div className={`profile-form ${openEditor ? "block" : "hidden"}`}>
        <EmployeeProfileEdit
          user={data}
          setOpenEditor={setOpenEditor}
        ></EmployeeProfileEdit>
      </div>
    </div>
  );
};

export default MyProfile;
