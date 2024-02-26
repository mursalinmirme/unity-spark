const AttendanceSkeleton = () => {
  return (
    <div className="border w-full px-7 py-12">
      <div className="skeleton bg-[#efefef] w-24 h-24 mx-auto rounded-full"></div>
      <div className="bg-[#efefef] skeleton w-52 h-8 mx-auto rounded-md mt-6"></div>
      <div className="bg-[#efefef] skeleton w-[40%] h-8 mx-auto rounded-md mt-6"></div>
      <div className="w-[60%] mx-auto flex items-center gap-5">
        <div className="bg-[#efefef] skeleton w-full h-8 mx-auto rounded-md mt-6"></div>
        <div className="bg-[#efefef] skeleton w-full h-8 mx-auto rounded-md mt-6"></div>
      </div>
      <div className="w-[70%] mx-auto flex items-center gap-5">
        <div className="bg-[#efefef] skeleton w-full h-8 mx-auto rounded-md mt-6"></div>
        <div className="bg-[#efefef] skeleton w-full h-8 mx-auto rounded-md mt-6"></div>
      </div>
      <div className="bg-[#efefef] skeleton w-40 h-10 mx-auto rounded-md mt-6"></div>
    </div>
  );
};

export default AttendanceSkeleton;
