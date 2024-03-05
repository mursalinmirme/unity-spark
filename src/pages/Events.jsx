import { Link } from "react-router-dom";
import eventCover from "../assets/images/event_page/event_original.jpg";
import EventCard from "./components/EventCard/EventCard";
const Events = () => {
  const eventStyles = {
    background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),url(${eventCover})`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center`,
  };

  return (
    <>
      <div style={eventStyles}>
        <div className="max-w-[92%] lg:max-w-[1200px] mx-auto">
        <div className="space-y-5 py-32">
          <div className="text-center">
            <div className="bg-[#424343] text-white rounded-full px-5 py-[4px]  text-center uppercase inline">
              Events
            </div>
          </div>
          <h1 className="text-center text-5xl font-semibold text-white md:leading-tight lg:leading-relaxed">
            HR Mastery Symposium Unleashing
            <br />
            Potential in People Management
          </h1>
          <h1 className="text-center text-xl font-normal text-white  md:leading-tight lg:leading-relaxed w-[70%] mx-auto">
            Explore our HR-centric events, designed to elevate your knowledge
            and foster connections. Join us for insightful discussions,
            workshops, and networking opportunities to enhance your human
            resource management skills.{" "}
          </h1>
          <div className="flex items-center justify-center gap-5">
            <Link to="/signup" className="nbtn mt-3">
              Register Now
            </Link>
            <button className="nbtn mt-3">Explore Events</button>
          </div>
        </div>
        </div>

      </div>
      <div className="text-center mt-10">
        <h1 className="text-3xl font-semibold mb-1">Upcoming HR Events</h1>
        <h1 className="text-lg font-medium">
          Empower your HR journey with insights
        </h1>
      </div>
      {/* <div className='text-xl  font-semibold my-7 flex justify-between'>
            <h1>Check Out More </h1>
           </div> */}
      <div className="max-w-[92%] lg:max-w-[1200px] mx-auto">
        <EventCard></EventCard>
      </div>
      
    </>
  );
};

export default Events;
