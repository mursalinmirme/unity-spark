const UserProfileEditSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="">
          <div className="skeleton w-24 h-24"></div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between flex-1 gap-3">
        <div className="space-y-3">
          <p className="skeleton w-28 md:w-40 h-4"></p>
          <p className="skeleton w-48 md:w-60 h-4"></p>
          <p className="skeleton w-56 md:w-72 h-3"></p>
        </div>
        <div>
          <p className="skeleton w-28 h-6 md:h-8"></p>
        </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1">
            <p className="skeleton w-28 h-4"></p>
            <p className="skeleton w-full h-10 mt-2 rounded-md"></p>
          </div>
          <div className="flex-1">
            <p className="skeleton w-28 h-4"></p>
            <p className="skeleton w-full h-10 mt-2 rounded-md"></p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mt-8">
          <div className="flex-1">
            <p className="skeleton w-28 h-4"></p>
            <p className="skeleton w-full h-10 mt-2 rounded-md"></p>
          </div>
          <div className="flex-1">
            <p className="skeleton w-28 h-4"></p>
            <p className="skeleton w-full h-10 mt-2 rounded-md"></p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <div className="flex-1">
            <p className="skeleton w-28 h-4"></p>
            <p className="skeleton w-full h-10 mt-2 rounded-md"></p>
          </div>
          <div className="flex-1">
            <p className="skeleton w-28 h-4"></p>
            <p className="skeleton w-full h-10 mt-2 rounded-md"></p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mt-8">
          <div className="flex-1">
            <p className="skeleton w-28 h-4"></p>
            <p className="skeleton w-full h-10 mt-2 rounded-md"></p>
          </div>
          <div className="flex-1">
            <p className="skeleton w-28 h-4"></p>
            <p className="skeleton w-full h-10 mt-2 rounded-md"></p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mt-8">
          <div className="flex-1">
            <p className="skeleton w-28 h-4"></p>
            <p className="skeleton w-full h-10 mt-2 rounded-md"></p>
          </div>
          <div className="flex-1">
            <p className="skeleton w-28 h-4"></p>
            <p className="skeleton w-full h-10 mt-2 rounded-md"></p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mt-8">
          <div className="flex-1">
            <p className="skeleton w-28 h-4"></p>
            <p className="skeleton w-full h-10 mt-2 rounded-md"></p>
          </div>
          <div className="flex-1">
            <p className="skeleton w-28 h-4"></p>
            <p className="skeleton w-full h-10 mt-2 rounded-md"></p>
          </div>
        </div>
        <div className="mt-5">
          <p className="skeleton w-28 h-4"></p>
          <p className="skeleton w-full h-10 mt-2 rounded-md"></p>
        </div>
        <div className="mt-5">
          <p className="skeleton w-28 h-4"></p>
          <p className="skeleton w-full h-10 mt-2 rounded-md"></p>
        </div>
        <div className="mt-5">
          <div className="skeleton w-36 h-11 mt-2 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileEditSkeleton;
