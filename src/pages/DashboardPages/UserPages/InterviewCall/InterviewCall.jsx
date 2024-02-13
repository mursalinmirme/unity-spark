import { AiOutlineAudioMuted } from "react-icons/ai";
import { BsCameraVideoOff } from "react-icons/bs";
import mursalinmir from "../../../../assets/images/Mursalin Mir.jpg";
import mursalinMir from "../../../../assets/images/Mursalin-Mir.jpg";
import useUserId from "../../../../hooks/useUserId";
import { IoCall } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const InterviewCall = () => {
  // const [userId] = useUserId();
  // console.log("the current user id is", userId);

  // Call System emplements
  const { roomId } = useParams();

  const handleButtonClick = () => {
    // Reload the page
    window.location.reload();
  };

  // All Admin Get
  // const { data: all } = useQuery({
  //   queryKey: ["all"],
  //   queryFn: async () => {
  //     const res = await useAxiosPublic.get("/all-admins");
  //     return res?.data;
  //   },
  // });

  const myMeeting = async (element) => {
    const appID = 1454166134;
    const serverSecret = "923792b6b7e4b3ddbd3d11c5a518e74b";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Rifazul"
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

  // let hasLoaded = false;

  // const myMeeting = async (element) => {
  //   // Check if the function has already been loaded
  //   if (!hasLoaded) {
  //     const appID = 1454166134;
  //     const serverSecret = "923792b6b7e4b3ddbd3d11c5a518e74b";
  //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
  //       appID,
  //       serverSecret,
  //       roomId,
  //       Date.now().toString(),
  //       "Rifazul"
  //     );
  //     const ze = ZegoUIKitPrebuilt.create(kitToken);
  //     ze.joinRoom({
  //       container: element,

  //       scenario: {
  //         mode: ZegoUIKitPrebuilt.OneONoneCall,
  //       },
  //       showScreenSharingButton: true,
  //     });

  //     // Set the flag to true after the function has been called once
  //     hasLoaded = true;
  //   }
  // };

  // Call the function once
  // myMeeting(document.getElementById("yourElementId"));

  return (
    <div>
      <div onClick={handleButtonClick} className="grid grid-cols-5 gap-6">
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
          <div className="w-full" ref={myMeeting} />
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
