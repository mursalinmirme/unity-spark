import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { MdOutlineVideocam, MdOutlineVideocamOff } from "react-icons/md";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Interviews = () => {
  const [open, setOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [videoOpen, setVideoOpen] = useState(false);
  const currentDayString = moment().format("dddd");
  const currentTime = moment().format("h:mm A");
  //   console.log("check", currentDayString);

  const { data: allInterviews } = useQuery({
    queryKey: ["allInterviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/get-interview");
      return res?.data;
    },
  });
  // const currentDate = moment().format("D/M/YYYY");
  const currentDate = moment().format("DD,MMMM,YYYY");

  console.log("check this time", currentDate.toString());

  // console.log("checked", allInterviews);

  return (
    <div>
      {allInterviews?.map((interviews) => (
        <div key={interviews?._id} className="border my-10 py-7">
          {" "}
          {/**Home Part */}
          <div className="space-y-3">
            <h3 className="text-[20px] font-inter font-semibold text-center">
              {interviews?.date}
            </h3>
            <p className="text-[20px] font-inter font-semibold text-center">
              Time : {interviews?.startTime} - {interviews?.endTime}
            </p>
          </div>
          {/**Body Part Candidate and Interviewer */}
          <div className="mt-5px  flex lg:flex-row flex-col justify-between mt-10 gap-4 lg:gap-0">
            <div className="w-full ">
              <h3 className="lg:text-end text-center pr-3 text-[20px] font-inter font-semibold">
                Candidate
              </h3>

              <div className="text-center mx-auto mt-5 pb-4">
                <img
                  className="w-16 h-16 rounded-full mx-auto"
                  src={interviews?.candidateImage}
                  alt=""
                />
                <h2 className="text-[20px] font-semibold font-inter mt-1">
                  {interviews?.candidateName}
                </h2>
                <p className="font-inter font-semibold">
                  {interviews?.candidateEmail}
                </p>
              </div>
            </div>

            <div className=" lg:border-l-2 border-[#D9D9D9] w-full">
              <h3 className="pl-3 text-[20px] lg:text-start text-center font-inter font-semibold">
                Interviewer
              </h3>
              <div className="text-center mx-auto mt-5 pb-4">
                <img
                  className="w-16 h-16 rounded-full mx-auto"
                  src={interviews?.interViewerImage}
                  alt=""
                />
                <h2 className="text-[20px] font-semibold font-inter mt-1">
                  {interviews?.interViewerName}
                </h2>
                <p className="font-inter font-semibold">
                  {interviews?.interViewerEmail}
                </p>
              </div>
            </div>
          </div>
          {/**Bottom part */}
          <div className="mt-10 text-center flex justify-center items-center gap-5">
            <span className="font-inter font-semibold text-[20px]">
              Check Your Connections
            </span>
            {/** Audio Icons */}
            <div
              className="cursor-pointer w-10 h-10 rounded-full border border-primary flex items-center justify-center"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <AiOutlineAudio className="text-2xl text-primary" />
              ) : (
                <AiOutlineAudioMuted className="text-2xl text-primary" />
              )}
            </div>

            {/** Video Icons */}
            <div
              className="cursor-pointer w-10 h-10 rounded-full border border-primary flex items-center justify-center"
              onClick={() => setVideoOpen(!videoOpen)}
            >
              {videoOpen ? (
                <MdOutlineVideocam className="text-2xl text-primary" />
              ) : (
                <MdOutlineVideocamOff className="text-2xl text-primary" />
              )}
            </div>
          </div>
          {/**Button */}
          <div className="text-center mt-10">
            {interviews &&
            new Date(interviews.date).toDateString() ===
              new Date(currentDate).toDateString() ? (
              <Link to={`/dashboard/interview-call/${interviews._id}`}>
                <button className="btn bg-primary px-7 py-1 text-white rounded-lg hover:bg-primary">
                  Ask to join
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="btn bg-primary px-7 py-1 text-white rounded-lg hover:bg-primary"
              >
                Ask to join
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Interviews;
