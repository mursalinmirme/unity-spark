import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "./InterviewCall.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useUserId from "../../../../hooks/useUserId";

const InterviewCall = () => {
  const { interviwId } = useParams();
  const [userId] = useUserId();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: interviewerPersons, isFetching } = useQuery({
    queryKey: ["interviewPersons"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/get-user-interview/${interviwId}`);
      return res.data;
    },
  });
  console.log("my user id is", userId);
  if (isFetching) {
    return <div>Loading...</div>;
  }

  // Video Call System Main Function
  const myMeeting = async (element) => {
    const appID = 1454166134;
    const serverSecret = "923792b6b7e4b3ddbd3d11c5a518e74b";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      interviwId,
      Date.now().toString(),
      user?.displayName
    );
    const ze = ZegoUIKitPrebuilt.create(kitToken);
    ze.joinRoom({
      container: element,

      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
    });
  };

  // console.log("check 444", myMeeting);

  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="border p-3 shadow-md rounded-2xl relative">
          <img
            className="w-16 h-16 border rounded-full mx-auto"
            src={interviewerPersons?.candidateImage}
            alt=""
          />
          <h3 className="text-center mt-3 font-semibold text-lg">
            {interviewerPersons?.candidateName}
          </h3>
          {/* <div className="absolute top-2 left-2 border p-0.5  rounded-full border-primary">
            <AiOutlineAudioMuted className="text-2xl text-primary"></AiOutlineAudioMuted>
          </div> */}
        </div>
        <div className="border p-3 shadow-md rounded-2xl relative">
          <img
            className="w-16 h-16 border rounded-full mx-auto"
            src={interviewerPersons?.interViewerImage}
            alt=""
          />
          <h3 className="text-center mt-3 font-semibold text-lg">
            {interviewerPersons?.interViewerName}
          </h3>
          {/* <div className="absolute top-2 left-2 border p-0.5  rounded-full border-primary">
            <AiOutlineAudioMuted className="text-2xl text-primary"></AiOutlineAudioMuted>
          </div> */}
        </div>
      </div>
      <div className="mt-7 relative">
        <div className="">
          <div className="w-full" ref={myMeeting}>
            <div className="flex flex-col justify-center items-center h-80 shadow-md">
              <p className="text-lg font-semibold text-gray-500">
                You have been leaved the interview
              </p>
              <button
                onClick={() => location.reload()}
                className="bg-primary text-white h-12 text-base font-medium px-6 rounded-2xl mt-5 animate-pulse"
              >
                Rejoin Now
              </button>
            </div>
          </div>
        </div>
        {/* <div className="absolute bottom-5 w-full">
          <div className="w-full">
            <div className="w-60 h-16 bg-[#ffffffad] mx-auto rounded-3xl flex justify-center items-center gap-6">
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
        </div> */}
      </div>
    </div>
  );
};

export default InterviewCall;
