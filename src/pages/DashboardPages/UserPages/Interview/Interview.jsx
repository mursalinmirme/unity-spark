import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { MdOutlineVideocam } from "react-icons/md";

const Interview = () => {
  return (
    <div>
      <div className="space-y-3">
        <h3 className="text-[20px] font-inter font-semibold text-center">
          Day : Sunday
        </h3>
        <p className="text-[20px] font-inter font-semibold text-center">
          Time : 10:16 PM
        </p>
      </div>

      <div className="mt-5px  flex lg:flex-row flex-col justify-between mt-10 gap-4 lg:gap-0">
        <div className="w-full ">
          <h3 className="lg:text-end pr-3 text-[20px] font-inter font-semibold">
            Candidate
          </h3>

          <div className="text-center mx-auto mt-5 pb-4">
            <img
              className="w-16 h-16 rounded-full mx-auto"
              src="https://i.ibb.co/DRqXm4r/395687920-750115476879631-8529659874036745582-n.jpg"
              alt=""
            />
            <h2 className="text-[20px] font-semibold font-inter">
              {" "}
              Ashraful Islam
            </h2>
            <p className="font-inter font-semibold">
              {" "}
              Ashraful@islamgmail.com{" "}
            </p>
          </div>
        </div>

        <div className=" lg:border-l-2 border-red-200 w-full">
          <h3 className="pl-3 text-[20px] font-inter font-semibold">
            Interviewer
          </h3>
          <div className="text-center mx-auto mt-5 pb-4">
            <img
              className="w-16 h-16 rounded-full mx-auto"
              src="https://i.ibb.co/3Y8nf6D/photo-1566753323558-f4e0952af115.png"
              alt=""
            />
            <h2 className="text-[20px] font-semibold font-inter">
              {" "}
              Mursalin Mir
            </h2>
            <p className="font-inter font-semibold"> mursalin@mirgmail.com </p>
          </div>
        </div>
      </div>

      {/**Bottom part */}
      <div className="mt-10 text-center flex justify-center items-center gap-5">
        <span className="font-inter font-bold text-[20px]">
          Check Your Connections
        </span>

        <AiOutlineAudio className="text-2xl" />
        {/* <AiOutlineAudioMuted /> */}
        {/* <MdOutlineVideocam className="text-2xl" /> */}
      </div>
    </div>
  );
};

export default Interview;
