const TrendingCourseSkeleton = () => {
    return (
        <>
         <h1 className=" mb-10 font-semibold text-2xl">Trending Course</h1>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-5 ">
             <div className=" border-2 border-gray-300 rounded-xl">
             <div className="skeleton h-[212px] "></div>
                <div className="space-y-5 p-4">
                <div className="skeleton h-6  w-[90%]"></div>
                <div className="skeleton h-6  w-[70%]"></div>
                    <div className="flex flex-col justify-start gap-5">
                            <button className="">
                            <div className="skeleton w-28 h-8"></div>
                            </button>
                            <button className="">
                               <div className="skeleton w-28 h-8"></div>
                            </button>
                            
                        </div>

                        <div className="text-left">
                        <button  className="w-36 h-10 skeleton  rounded-xl"></button>
                        </div>
                </div>
              </div>
              <div className=" border-2 border-gray-300 rounded-xl">
             <div className="skeleton h-[212px] "></div>
                <div className="space-y-5 p-4">
                <div className="skeleton h-6  w-[90%]"></div>
                <div className="skeleton h-6  w-[70%]"></div>
                    <div className="flex flex-col justify-start gap-5">
                            <button className="">
                            <div className="skeleton w-28 h-8"></div>
                            </button>
                            <button className="">
                               <div className="skeleton w-28 h-8"></div>
                            </button>
                            
                        </div>

                        <div className="text-left">
                        <button  className="w-36 h-10 skeleton  rounded-xl"></button>
                        </div>
                </div>
              </div>
              <div className=" border-2 border-gray-300 rounded-xl">
             <div className="skeleton h-[212px] "></div>
                <div className="space-y-5 p-4">
                <div className="skeleton h-6  w-[90%]"></div>
                <div className="skeleton h-6  w-[70%]"></div>
                    <div className="flex flex-col justify-start gap-5">
                            <button className="">
                            <div className="skeleton w-28 h-8"></div>
                            </button>
                            <button className="">
                               <div className="skeleton w-28 h-8"></div>
                            </button>
                            
                        </div>

                        <div className="text-left">
                        <button  className="w-36 h-10 skeleton  rounded-xl"></button>
                        </div>
                </div>
              </div>
        </div>
        </>
        
    );
};

export default TrendingCourseSkeleton;