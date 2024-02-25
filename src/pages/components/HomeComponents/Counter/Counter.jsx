import { useEffect, useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
const Counter = () => {
  const axiosPublic = useAxiosPublic();

  const [startCount, setstartCount] = useState(false);
  const handleCounter = (isVisible) => {
    if (isVisible && !startCount) {
      setstartCount(true);
    }
  };
  const [userCount, setUserCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [jobAdsCount, setJobadsCount] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  useEffect(() => {
    axiosPublic.get("/users/count").then((res) => {
      setUserCount(res?.data?.count);
    });
    axiosPublic.get("/employee/count").then((res) => {
      setEmployeeCount(res?.data?.count);
    });
    axiosPublic.get("/availableJobs/count").then((res) => {
      setJobadsCount(res?.data?.count);
    });
    axiosPublic.get("/total_events/count").then((res) => {
      setTotalEvents(res?.data?.count);
    });
  }, []);
  return (
    <div className="counter">
      <div className="counter_container">
        <div className="counter_box">
          <CountUp end={userCount} duration={4} suffix="+" start={startCount}>
            {({ countUpRef }) => (
              <VisibilitySensor onChange={handleCounter} delayedCall>
                <span ref={countUpRef} />
              </VisibilitySensor>
            )}
          </CountUp>
          <h3>Total Users</h3>
        </div>
        <div className="counter_box">
          <CountUp
            end={employeeCount}
            duration={5}
            suffix="+"
            start={startCount}
          >
            {({ countUpRef }) => (
              <VisibilitySensor onChange={handleCounter} delayedCall>
                <span ref={countUpRef} />
              </VisibilitySensor>
            )}
          </CountUp>
          <h3>Active Employees</h3>
        </div>
        <div className="counter_box">
          <CountUp end={jobAdsCount} duration={5} suffix="+" start={startCount}>
            {({ countUpRef }) => (
              <VisibilitySensor onChange={handleCounter} delayedCall>
                <span ref={countUpRef} />
              </VisibilitySensor>
            )}
          </CountUp>
          <h3>Total Job Posts</h3>
        </div>
        <div className="counter_box">
          <CountUp end={totalEvents} duration={5} suffix="+" start={startCount}>
            {({ countUpRef }) => (
              <VisibilitySensor onChange={handleCounter} delayedCall>
                <span ref={countUpRef} />
              </VisibilitySensor>
            )}
          </CountUp>
          <h3>Events Completed</h3>
        </div>
      </div>
    </div>
  );
};

export default Counter;
