import moment from "moment";
import { useCallback, useContext, useState } from "react";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { MdOutlineVideocam, MdOutlineVideocamOff } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import useUserId from "../../../../hooks/useUserId";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import image from "../../../../assets/images/waiting-interview.png";

const Interview = () => {
  const [open, setOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [videoOpen, setVideoOpen] = useState(false);
  const currentDayString = moment().format("dddd");
  const currentTime = moment().format("h:mm A");
  //   console.log("check", currentDayString);
  const [userId] = useUserId();

  const { user } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ["interviewsInfo"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/get-user-interview/${user?.email}`);
      return res.data;
    },
  });

  // console.log("checked", data, user?.email);

  return (
    <div>
      {data?.candidateEmail ? (
        <div>
          {" "}
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
            <div className="text-center">
              <Link to={`/dashboard/interview-call/${userId?._id}`}>
                <button className="btn bg-primary px-7 py-1 text-white rounded-lg hover:bg-primary">
                  Ask to join
                </button>
              </Link>
            </div>
          </div>{" "}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh] ">
          <div className=" text-center mx-auto w-72 opacity-75">
            <img src={image} alt="" />
          </div>
          <p className=" text-lg pt-5 font-bold font-inter text-gray-600">
            {" "}
            You have not been selected for an interview yet{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default Interview;
