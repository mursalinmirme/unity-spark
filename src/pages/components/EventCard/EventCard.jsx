import { CiClock2 } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { PiMicrophoneStageThin } from "react-icons/pi";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUserRole from "../../../hooks/useUserRole";
import { toast } from "sonner";

const EventCard = () => {
  const [isUser] = useUserRole();

  const { register, handleSubmit, reset } = useForm();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [currentId, setCurrentId] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosPublic.get("/events");
      return res?.data;
    },
  });
  const { data: eventsingleId = [] } = useQuery({
    queryKey: ["eventsingleId", currentId],
    enabled: !!currentId,
    queryFn: async () => {
      const res = await axiosPublic.get(`/events/${currentId}`);
      return res?.data;
    },
  });
  //    console.log(eventsId)

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleModalOpen = (id) => {
    document.getElementById("my_modal_3").showModal();
    console.log(id);
    setCurrentId(id);
  };
  const onSubmit = (data) => {
    const reqEventData = {
      reqeventName: eventsingleId?.eventName,
      reqeventEmail: data?.employee_email,
      reqeventId: currentId,
      reqeventPosition: data?.employee_position,
      reqeventHost: eventsingleId?.hostName,
      reqeventStartTime: eventsingleId?.starting_time,
      reqeventEmployeeName: data?.employee_name,
      reqeventDate: eventsingleId?.date,
    };
    console.log(reqEventData);
    axiosPublic
      .post("/reqEvents", reqEventData)
      .then((res) => {
        if (res?.data) {
          toast.success("Registration Complete");
          reset();
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  return (
    <Swiper
      slidesPerView={screenSize < 768 ? 1 : screenSize < 1024 ? 2 : 3}
      spaceBetween={30}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper eventSwiper"
    >
      {events.map((items) => (
        <SwiperSlide key={items?._id}>
          {" "}
          <div className=" bg-white border border-[#D9D9D9] overflow-hidden rounded-3xl min-h-[535px] relative">
            <img src={items?.image} alt="" className="!-z-10 !min-h-[250px]" />
            <div className="p-5 space-y-3 -mt-6 !z-10 rounded-t-3xl bg-white absolute">
              <h1 className="font-semibold text-[23px] text-left">
                {items?.eventName}
              </h1>
              <h1 className="text-xl font-medium flex  items-center gap-5">
                <CiClock2 className="text-2xl"></CiClock2>
                {items?.starting_time} - {items?.ending_time}
              </h1>
              <h1 className="text-xl font-medium flex  items-center gap-5">
                <CiCalendar className="text-2xl"></CiCalendar>
                {items?.date}
              </h1>
              <h1 className="text-xl font-medium flex  items-center gap-5">
                <PiMicrophoneStageThin className="text-2xl"></PiMicrophoneStageThin>
                {items?.hostName}
              </h1>
              <div className="pt-4 text-left">
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                {isUser.role === "employee" ? (
                  <button
                    className="nbtn"
                    onClick={() => handleModalOpen(items?._id)}
                  >
                    Register Now
                  </button>
                ) : (
                  <button
                    style={{ cursor: "not-allowed" }}
                    onClick={() =>
                      toast.error("This event organized only for employees")
                    }
                    className="nbtn-fixed-bg disabled"
                  >
                    Employee Only
                  </button>
                )}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label>
                <div>
                  <span className="font-bold font-inter">Event Name:</span>
                </div>
                <input
                  className="border-[1.5px]"
                  defaultValue={eventsingleId?.eventName}
                  type="text"
                  {...register("name")}
                  readOnly
                />
              </label>
            </div>
            <div>
              <label>
                <div>
                  <span className="font-bold font-inter">
                    Event Starting Time
                  </span>
                </div>
                <input
                  defaultValue={eventsingleId?.starting_time}
                  type="text"
                  {...register("time")}
                  readOnly
                  className="border-[1.5px]"
                />
              </label>
            </div>
            <div>
              <label>
                <div>
                  <span className="font-bold font-inter">Event Host</span>
                </div>
                <input
                  defaultValue={eventsingleId?.hostName}
                  type="text"
                  {...register("host")}
                  readOnly
                  className="border-[1.5px]"
                />
              </label>
            </div>
            <div>
              <label>
                <div>
                  <span className="font-bold font-inter">Your Name</span>
                </div>
                <input
                  // defaultValue={}
                  type="text"
                  className="border-[1.5px]"
                  {...register("employee_name")}
                />
              </label>
            </div>
            <div>
              <label>
                <div>
                  <span className="font-bold font-inter">Your Email</span>
                </div>
                <input
                  // defaultValue={}
                  type="text"
                  className="border-[1.5px]"
                  {...register("employee_email")}
                />
              </label>
            </div>
            <div>
              <label>
                <div>
                  <span className="font-bold font-inter">Your Position</span>
                </div>
                <input
                  // defaultValue={}
                  type="text"
                  {...register("employee_position")}
                  className="border-[1.5px]"
                />
              </label>
            </div>
            <div>
              <input
                className="w-36 nbtn-fixed-bg"
                type="submit"
                value="Book Event"
              />
            </div>
          </form>
        </div>
      </dialog>
    </Swiper>
  );
};

export default EventCard;
