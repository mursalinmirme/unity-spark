const SkeletonInterview = () => {
  return (
    <div>
      <div className="space-y-3  mb-10 ">
        <h3 className="skeleton mx-auto w-64 h-[30px] bg-slate-300 rounded-none"></h3>
        <h3 className="skeleton mx-auto w-72 h-[30px] bg-slate-300 rounded-none"></h3>
      </div>
      {/**Body Part Candidate and Interviewer */}
      <div className=" mt-5px  flex lg:flex-row flex-col justify-between ">
        <div className=" w-full lg:border-r-2 border-gray-600 ">
          <div className="flex justify-end p-2">
            <p className="skeleton  w-28 h-[30px] bg-slate-400 rounded-none"></p>
          </div>

          <div className=" text-center mx-auto space-y-2">
            <p className="skeleton w-16 h-16 rounded-full mx-auto bg-slate-500"></p>
            <h3 className="skeleton mx-auto w-64 h-[30px] bg-slate-300 rounded-none"></h3>
            <h3 className="skeleton mx-auto w-72 h-[30px] bg-slate-300 rounded-none"></h3>
          </div>
        </div>

        {/**  Card2 */}
        <div className=" w-full ">
          <div className=" p-2">
            <p className="skeleton  w-28 h-[30px] bg-slate-400 rounded-none"></p>
          </div>

          <div className=" text-center mx-auto space-y-2">
            <p className="skeleton w-16 h-16 rounded-full mx-auto bg-slate-500"></p>
            <h3 className="skeleton mx-auto w-64 h-[30px] bg-slate-300 rounded-none"></h3>
            <h3 className="skeleton mx-auto w-72 h-[30px] bg-slate-300 rounded-none"></h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonInterview;
