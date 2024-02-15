import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import OtherPaymentTable from "./OtherPaymentTable";

const OtherPayment = () => {
  const { data: utensils = [] } = useQuery({
    queryKey: ["utensils"],
    queryFn: async () => {
      const res = await axios.get("/utensils_cost.json");
      return res.data;
    },
  });
  console.log(utensils);
  return (
    <div>
      <div>
        <table className="table border-[#45A5E1] mt-10">
          {/* head */}
          <thead className="bg-[#45A5E1] text-white text-[18px] text-center">
            <tr className="row-border border-2 border-[#45A5E1] rounded-lg">
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
                  idx={idx}></OtherPaymentTable>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OtherPayment;
