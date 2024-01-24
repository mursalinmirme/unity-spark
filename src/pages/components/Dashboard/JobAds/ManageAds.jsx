import { HiMagnifyingGlass } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { LuPenLine } from "react-icons/lu";

const ManageAds = () => {
  return (
    <div className="mt-4 flex justify-between items-center">
      <button className="text-lg">
        <HiMagnifyingGlass />
      </button>

      <div>
        <Link to="/dashboard/addJobs">
          <p className="flex items-center gap-2 text-[#433ebe] font-inter font-semibold border-[3px] border-[#433ebe] p-2 rounded-lg">
            <LuPenLine></LuPenLine> <span>New Ad</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ManageAds;
