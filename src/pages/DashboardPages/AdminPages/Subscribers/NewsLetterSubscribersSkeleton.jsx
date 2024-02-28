
const NewsLetterSubscribersSkeleton = () => {
    return (
        <div>
      <div className="mb-5 flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Our Newsletter Subscribers</h3>
        <p className="px-4 py-2.5 flex items-center justify-center gap-2 border rounded-lg">
            <p className="w-5 h-5 skeleton rounded-full"></p>
            <p className="w-40 h-5 skeleton rounded-full"></p>
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table border">
          {/* head */}
          <thead className="bg-primary">
            <tr className="text-white text-base">
              <th>SL.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Profile</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
              <tr  className="text-base">
                <th><p className="skeleton rounded-lg w-6 h-6"></p></th>
                <td className="text-left"><p className="skeleton w-40 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-48 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-12 h-12 rounded-full"></p></td>
                <td className="text-left"><p className="skeleton w-28 h-6"></p></td>
              </tr>
              <tr  className="text-base">
                <th><p className="skeleton rounded-lg w-6 h-6"></p></th>
                <td className="text-left"><p className="skeleton w-40 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-48 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-12 h-12 rounded-full"></p></td>
                <td className="text-left"><p className="skeleton w-28 h-6"></p></td>
              </tr>
              <tr  className="text-base">
                <th><p className="skeleton rounded-lg w-6 h-6"></p></th>
                <td className="text-left"><p className="skeleton w-40 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-48 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-12 h-12 rounded-full"></p></td>
                <td className="text-left"><p className="skeleton w-28 h-6"></p></td>
              </tr>
              <tr  className="text-base">
                <th><p className="skeleton rounded-lg w-6 h-6"></p></th>
                <td className="text-left"><p className="skeleton w-40 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-48 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-12 h-12 rounded-full"></p></td>
                <td className="text-left"><p className="skeleton w-28 h-6"></p></td>
              </tr>
              <tr  className="text-base">
                <th><p className="skeleton rounded-lg w-6 h-6"></p></th>
                <td className="text-left"><p className="skeleton w-40 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-48 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-12 h-12 rounded-full"></p></td>
                <td className="text-left"><p className="skeleton w-28 h-6"></p></td>
              </tr>
              <tr  className="text-base">
                <th><p className="skeleton rounded-lg w-6 h-6"></p></th>
                <td className="text-left"><p className="skeleton w-40 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-48 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-12 h-12 rounded-full"></p></td>
                <td className="text-left"><p className="skeleton w-28 h-6"></p></td>
              </tr>
              <tr  className="text-base">
                <th><p className="skeleton rounded-lg w-6 h-6"></p></th>
                <td className="text-left"><p className="skeleton w-40 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-48 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-12 h-12 rounded-full"></p></td>
                <td className="text-left"><p className="skeleton w-28 h-6"></p></td>
              </tr>
              <tr  className="text-base">
                <th><p className="skeleton rounded-lg w-6 h-6"></p></th>
                <td className="text-left"><p className="skeleton w-40 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-48 h-6"></p></td>
                <td className="text-left"><p className="skeleton w-12 h-12 rounded-full"></p></td>
                <td className="text-left"><p className="skeleton w-28 h-6"></p></td>
              </tr>

          </tbody>
        </table>
      </div>
    </div>
    );
};

export default NewsLetterSubscribersSkeleton;