import { AiOutlineAudioMuted } from "react-icons/ai";
import { BsCameraVideoOff } from "react-icons/bs";
import jamilVai from "../../../../assets/images/Jami vai.png";
import mursalinmir from "../../../../assets/images/Mursalin Mir.jpg";
import mursalinMir from "../../../../assets/images/Mursalin-Mir.jpg";
import useUserId from "../../../../hooks/useUserId";
import { IoCall } from "react-icons/io5";
const InterviewCall = () => {
  const [userId] = useUserId();
  console.log("the current user id is", userId);
  return (
    <div>
      <div className="grid grid-cols-5 gap-6">
        <div className="border p-3 shadow-md rounded-2xl relative">
          <img
            className="w-20 h-20 border rounded-full mx-auto"
            src={mursalinmir}
            alt=""
          />
          <h3 className="text-center mt-3 font-semibold text-lg">
            Mursalin Mir
          </h3>
          <div className="absolute top-2 left-2 border p-0.5  rounded-full border-primary">
            <AiOutlineAudioMuted className="text-2xl text-primary"></AiOutlineAudioMuted>
          </div>
        </div>
        <div className="border p-3 shadow-md rounded-2xl relative">
          <img
            className="w-20 h-20 border rounded-full mx-auto"
            src={mursalinMir}
            alt=""
          />
          <h3 className="text-center mt-3 font-semibold text-lg">
            Mursalin Mir
          </h3>
          <div className="absolute top-2 left-2 border p-0.5  rounded-full border-primary">
            <AiOutlineAudioMuted className="text-2xl text-primary"></AiOutlineAudioMuted>
          </div>
        </div>
      </div>
      <div className="mt-7 relative">
        <div>
          <img className="w-full h-[550px] rounded-2xl" src={jamilVai} alt="" />
        </div>
        <div className="absolute bottom-5 w-full">
          <div className="w-full">
            <div className="w-60 h-16 bg-[#ffffffad] mx-auto rounded-3xl flex justify-center items-center gap-6" >
              <div className="rounded-full bg-primary p-2 border-2 border-white">
                <AiOutlineAudioMuted className="text-2xl text-white"></AiOutlineAudioMuted>
              </div>
              <div className="rounded-full bg-primary p-2 border-2 border-white">
                <BsCameraVideoOff className="text-2xl text-white"></BsCameraVideoOff>
              </div>
              <div className="rounded-full bg-red-600 p-2 border-2 border-white">
                <IoCall className="text-2xl text-white"></IoCall>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCall;
