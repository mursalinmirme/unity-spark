import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { MdOutlineVideocam, MdOutlineVideocamOff } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import useUserId from "../../../../hooks/useUserId";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import moment from "moment";

const InterviewsDetails = () => {
  const [open, setOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const [videoOpen, setVideoOpen] = useState(false);
  const [userId] = useUserId();

  // just one interView information Show
  const { data } = useQuery({
    queryKey: ["interviewDetails"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/interviewDetails/${id}`);
      return res.data;
    },
  });

  // Time
  const currentDate = moment().format("DD,MMMM,YYYY");
  const currentTime = moment().format("h:mm A");

  // if(data?.date === data?.date)
  console.log(data?.startTime, currentTime);

  return (
    <div>
      <div>
        {/**Home Part */}
        <div className="space-y-3">
          <h3 className="text-[20px] font-inter font-semibold text-center">
            {data?.date}
          </h3>
          <p className="text-[20px] font-inter font-semibold text-center">
            Time : {data?.startTime} - {data?.endTime}
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
                src={data?.candidateImage}
                alt=""
              />
              <h2 className="text-[20px] font-semibold font-inter mt-1">
                {" "}
                {data?.candidateName}
              </h2>
              <p className="font-inter font-semibold">
                {" "}
                {data?.candidateEmail}{" "}
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
                src={data?.interViewerImage}
                alt=""
              />
              <h2 className="text-[20px] font-semibold font-inter mt-1">
                {" "}
                {data?.interViewerName}
              </h2>
              <p className="font-inter font-semibold">
                {" "}
                {data?.interViewerEmail}{" "}
              </p>
            </div>
          </div>
        </div>
        {/**Bottom part */}

        {/* <div className="mt-10 text-center flex flex-col md:flex-row justify-center items-center gap-5">
          <span className="font-inter font-semibold text-[20px]">
            Check Your Connections
          </span>
        
          <div className="flex gap-5">
            <div
              className="cursor-pointer w-10 h-10 rounded-full border border-primary flex items-center justify-center"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <AiOutlineAudioMuted className="text-2xl text-primary" />
              ) : (
                <AiOutlineAudio className="text-2xl text-primary" />
              )}
            </div>

            <div
              className="cursor-pointer w-10 h-10 rounded-full border border-primary flex items-center justify-center"
              onClick={() => setVideoOpen(!videoOpen)}
            >
              {videoOpen ? (
                <MdOutlineVideocamOff className="text-2xl text-primary" />
              ) : (
                <MdOutlineVideocam className="text-2xl text-primary" />
              )}
            </div>
          </div>
        </div> */}

        <div className="text-center mt-10">
          {data &&
          new Date(data?.date && data?.startTime).toDateString() ===
            new Date(currentDate && currentTime).toDateString() ? (
            <Link to={`/dashboard/interview-call/${id}`}>
              <button className="btn bg-primary px-7 py-1 text-white rounded-lg hover:bg-primary">
                Join Now
              </button>
            </Link>
          ) : (
            <Link to={`/dashboard/interview-call/${id}`}>
              <button
                disabled
                className="btn bg-primary px-7 py-1 text-white rounded-lg hover:bg-primary"
              >
                Join Now
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewsDetails;
