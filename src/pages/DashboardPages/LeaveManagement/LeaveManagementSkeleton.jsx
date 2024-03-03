const LeaveManagementSkeleton = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">My Leave Requests</h3>
        <div className="skeleton w-24 md:w-32 h-6 md:h-8"></div>
      </div>
      <div className="overflow-x-auto mt-6">
      <table className="table border">
        {/* head */}
        <thead className="bg-second text-white text-base rounded-md ">
          <tr>
            <th className="w-16">Serial</th>
            <th className="min-w-48">Subject</th>
            <th className="min-w-52">Reason</th>
            <th className="w-20">Days</th>
            <th className="w-48">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><p className="skeleton w-6 h-6 rounded-md"></p></td>
            <td><p className="skeleton w-[80%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-[90%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md mx-auto"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md"></p></td>
          </tr>
          <tr>
            <td><p className="skeleton w-6 h-6 rounded-md"></p></td>
            <td><p className="skeleton w-[80%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-[90%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md mx-auto"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md"></p></td>
          </tr>
          <tr>
            <td><p className="skeleton w-6 h-6 rounded-md"></p></td>
            <td><p className="skeleton w-[80%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-[90%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md mx-auto"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md"></p></td>
          </tr>
          <tr>
            <td><p className="skeleton w-6 h-6 rounded-md"></p></td>
            <td><p className="skeleton w-[80%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-[90%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md mx-auto"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md"></p></td>
          </tr>
          <tr>
            <td><p className="skeleton w-6 h-6 rounded-md"></p></td>
            <td><p className="skeleton w-[80%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-[90%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md mx-auto"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md"></p></td>
          </tr>
          <tr>
            <td><p className="skeleton w-6 h-6 rounded-md"></p></td>
            <td><p className="skeleton w-[80%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-[90%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md mx-auto"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md"></p></td>
          </tr>
          <tr>
            <td><p className="skeleton w-6 h-6 rounded-md"></p></td>
            <td><p className="skeleton w-[80%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-[90%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md mx-auto"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md"></p></td>
          </tr>
          <tr>
            <td><p className="skeleton w-6 h-6 rounded-md"></p></td>
            <td><p className="skeleton w-[80%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-[90%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md mx-auto"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md"></p></td>
          </tr>
          <tr>
            <td><p className="skeleton w-6 h-6 rounded-md"></p></td>
            <td><p className="skeleton w-[80%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-[90%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md mx-auto"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md"></p></td>
          </tr>
          <tr>
            <td><p className="skeleton w-6 h-6 rounded-md"></p></td>
            <td><p className="skeleton w-[80%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-[90%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md mx-auto"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md"></p></td>
          </tr>
          <tr>
            <td><p className="skeleton w-6 h-6 rounded-md"></p></td>
            <td><p className="skeleton w-[80%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-[90%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md mx-auto"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md"></p></td>
          </tr>
          <tr>
            <td><p className="skeleton w-6 h-6 rounded-md"></p></td>
            <td><p className="skeleton w-[80%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-[90%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md mx-auto"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md"></p></td>
          </tr>
          <tr>
            <td><p className="skeleton w-6 h-6 rounded-md"></p></td>
            <td><p className="skeleton w-[80%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-[90%] h-5 rounded-md"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md mx-auto"></p></td>
            <td><p className="skeleton w-full h-5 rounded-md"></p></td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default LeaveManagementSkeleton;
