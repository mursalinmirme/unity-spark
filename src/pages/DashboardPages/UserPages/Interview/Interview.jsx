import moment from "moment";
import { useState } from "react";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { MdOutlineVideocam, MdOutlineVideocamOff } from "react-icons/md";

const Interview = () => {
  const [open, setOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const currentDayString = moment().format("dddd");
  const currentTime = moment().format("h:mm A");
  //   console.log("check", currentDayString);
  return (
    <div>
      {/**Home Part */}
      <div className="space-y-3">
        <h3 className="text-[20px] font-inter font-semibold text-center">
          Day : {currentDayString}
        </h3>
        <p className="text-[20px] font-inter font-semibold text-center">
          Time : {currentTime}
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
              src="https://i.ibb.co/DRqXm4r/395687920-750115476879631-8529659874036745582-n.jpg"
              alt=""
            />
            <h2 className="text-[20px] font-semibold font-inter mt-1">
              {" "}
              Ashraful Islam
            </h2>
            <p className="font-inter font-semibold">
              {" "}
              Ashraful@islamgmail.com{" "}
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
              src="https://i.ibb.co/3Y8nf6D/photo-1566753323558-f4e0952af115.png"
              alt=""
            />
            <h2 className="text-[20px] font-semibold font-inter mt-1">
              {" "}
              Mursalin Mir
            </h2>
            <p className="font-inter font-semibold"> mursalin@mirgmail.com </p>
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
        <button className=" btn bg-primary px-7 py-1 text-white rounded-lg hover:bg-primary">
          Ask to join
        </button>
      </div>
    </div>
  );
};

export default Interview;
