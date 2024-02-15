/* eslint-disable react/prop-types */
import moment from "moment";
import { useState } from "react";
import { IoCheckmark, IoEyeOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { GiConfirmed } from "react-icons/gi";
const ApplicantsCard = ({
  value,
  handleUpdateRole,
  handleDelete,
  setApplicationId,
  setIndividual,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log("emijkdjfklsdjfdksl", value);
  return (
    <div className="border-2 border-[#D9D9D9] rounded-xl px-2 md:px-5 py-2">
      <div className="flex items-center justify-between">
        <div className="flex  items-center gap-5">
          <img
            src={value?.image}
            alt="avatar"
            className="w-[50px] h-[50px] rounded-full"
          />
          <div>
            <h1 className="font-semibold text-lg">{value?.title}</h1>
            <h1 className="font-semibold text-[#5B5555]">
              {value?.permanent_address}
            </h1>
          </div>
        </div>

        <section className="space-x-5 justify-center items-center hidden md:flex text-white">
          <button
            onClick={() => {
              setIndividual(value?.email), setApplicationId(value?._id);
              document.getElementById("my_modal_88").showModal();
            }}
            className="rounded-md p-2  bg-accent hover:bg-second hover:-mt-1"
          >
            <span className="font-medium">Confirm Employee</span>
          </button>
          <button
            onClick={() => handleDelete(value?._id)}
            className="rounded-md py-2 px-3 bg-red-500 hover:bg-red-700 hover:-mt-1"
          >
            <span className="font-medium">Reject</span>
          </button>
        </section>
      </div>
    </div>
  );
};

export default ApplicantsCard;
