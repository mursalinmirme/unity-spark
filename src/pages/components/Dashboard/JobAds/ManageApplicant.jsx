import { IoEyeOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx"
import { Link } from "react-router-dom";
const ManageApplicant = () => {
  return <div className="py-10">

  <div className="border-2 border-[#D9D9D9] rounded-xl px-5 py-2">
     <div className="flex items-center justify-between">
     <section className="flex  items-center gap-5">
        
        <img src="https://i.ibb.co/x2WP2jQ/73886110a00aca5829ed3e9b6ca8b3e3.png" alt="avatar"
         className="w-[60px] h-[60px] rounded-full"/>
        <div>
          <h1 className="font-semibold text-xl">Ashraful Islam</h1>
          <h1 className="font-semibold text-lg text-[#5B5555]">from Noakhali, Bangladesh</h1>
        </div>
        </section>
        <section className="space-x-3 flex justify-center items-center">
              <Link className="rounded-xl w-11 h-11 bg-[#433EBE]">
              <IoEyeOutline className="text-xl font-bold text-white mt-[12px] ml-3"></IoEyeOutline></Link>
              <Link className="rounded-xl  w-11 h-11 bg-[#433EBE]">
                <IoCheckmark className="text-xl font-bold text-white mt-[12px] ml-3"></IoCheckmark></Link>
              <Link className="rounded-xl  w-11 h-11 bg-[#433EBE]">
                <RxCross1 className="text-xl font-bold text-white mt-[12px] ml-3"></RxCross1></Link>
            </section>
     </div>
  </div>
</div>
};

export default ManageApplicant;
