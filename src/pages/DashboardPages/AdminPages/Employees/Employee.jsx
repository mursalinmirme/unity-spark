import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const Employee = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allEmployees = [] } = useQuery({
    queryKey: ["allEmployees"],
    queryFn: async () => {
      const res = await axiosPublic.get("/employees");
      return res?.data;
    },
  });

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <h4 className="text-2xl font-semibold mb-5">All Employees List</h4>
        <table style={{ borderRadius: "50px" }} className="table border ">
          {/* head */}
          <thead className="bg-second text-white text-[18px] rounded-md text-center">
            <tr className="text-left">
              <th>
                <label>#</label>
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position </th>
            </tr>
          </thead>
          <tbody className="mt-20">
            {allEmployees?.map((user, idx) => (
              <tr key={user?._id}>
                <td className="text-left">
                  <label className="font-semibold">{idx + 1}</label>
                </td>

                <td>
                  <div className="flex justify-center gap-3">
                    <div className="avatar ">
                      <div className="w-12 h-12 rounded-full">
                        <img
                          src={user?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-left">{user?.name}</td>
                <td className="text-left">{user?.email}</td>

                <td>
                  {user?.position === "guest" ? (
                    <p className="text-second text-left">{user?.position} </p>
                  ) : (
                    <p className="text-primary font-semibold text-left">{user?.position} </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
