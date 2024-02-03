import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const Employee = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allUsers = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/employees");
      return res?.data;
    },
  });

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table style={{ borderRadius: "50px" }} className="table border ">
          {/* head */}
          <thead className="bg-second text-white text-[18px] rounded-md text-center">
            <tr>
              <th>
                <label>#</label>
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>

              <th>Role </th>
            </tr>
          </thead>
          <tbody className="mt-20">
            {allUsers?.map((user, idx) => (
              <tr key={user?._id}>
                <td>
                  <label>{idx + 1}</label>
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
                <td>{user?.name}</td>
                <td>{user?.email}</td>

                <td>
                  {user?.position === "guest" ? (
                    <p className="text-primary">{user?.position} </p>
                  ) : (
                    <p className="text-green-500">{user?.position} </p>
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
