const CardsSkeleton = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-5">Running Task</h1>
          <div className="border-2 border-gray-300 p-4">
            <div className="flex justify-start gap-5 items-center">
              <div className="skeleton w-12 h-12 rounded-full"></div>
              <div>
                <div className="skeleton w-48 h-6"></div>
                <p className="text-[#5B5555] text-[14px]">
                  <div className="skeleton w-40 h-4 mt-2"></div>
                </p>
              </div>
            </div>
            <div className="skeleton w-full h-4 mt-4"></div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-5">
            Completed Task
          </h1>
          <div className="border-2 border-gray-300 p-4">
            <div className="flex justify-start gap-5 items-center">
              <div className="skeleton w-12 h-12 rounded-full"></div>
              <div>
                <div className="skeleton w-48 h-6"></div>
                <p className="text-[#5B5555] text-[14px]">
                  <div className="skeleton w-40 h-4 mt-2"></div>
                </p>
              </div>
            </div>
            <div className="skeleton w-full h-4 mt-4"></div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-5">
          Registered Events
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border-2 border-gray-300 p-4">
            <div className="flex justify-start gap-5 items-center">
              <div className="skeleton w-12 h-12 rounded-full"></div>
              <div>
                <div className="skeleton w-48 h-6"></div>
                <p className="text-[#5B5555] text-[14px]">
                  <div className="skeleton w-40 h-4 mt-2"></div>
                </p>
              </div>
            </div>
            <div className="skeleton w-full h-4 mt-4"></div>
          </div>
          <div className="border-2 border-gray-300 p-4">
            <div className="flex justify-start gap-5 items-center">
              <div className="skeleton w-12 h-12 rounded-full"></div>
              <div>
                <div className="skeleton w-48 h-6"></div>
                <p className="text-[#5B5555] text-[14px]">
                  <div className="skeleton w-40 h-4 mt-2"></div>
                </p>
              </div>
            </div>
            <div className="skeleton w-full h-4 mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsSkeleton;
