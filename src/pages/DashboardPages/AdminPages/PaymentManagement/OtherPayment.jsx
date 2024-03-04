import { useQuery } from "@tanstack/react-query";
import OtherPaymentTable from "./OtherPaymentTable";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const OtherPayment = () => {
  const axiosPublic = useAxiosPublic();
  const { data: utensils = [] } = useQuery({
    queryKey: ["utensils"],
    queryFn: async () => {
      const res = await axiosPublic.get("/utensils");
      return res.data;
    },
  });
  console.log("checked", utensils);
  return (
    <div>
      <div>
        <table className="table mt-10">
          {/* head */}
          <thead className="bg-[#45A5E1] text-white">
            <tr className="row-border table-style">
              <th>Name</th>

              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {utensils &&
              utensils?.map((utensil, idx) => (
                <OtherPaymentTable
                  key={utensil?._id}
                  utensil={utensil}
                  idx={idx}
                ></OtherPaymentTable>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OtherPayment;
