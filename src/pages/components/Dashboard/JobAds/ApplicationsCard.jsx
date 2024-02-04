/* eslint-disable react/prop-types */
import moment from "moment";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoCheckmark, IoEyeOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

const ApplicationsCard = ({value, handleUpdateRole, handleDelete}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   

    return (
        <div
        className="border-2 border-[#D9D9D9] rounded-xl px-2 md:px-5 py-2"
      >
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
                applied at {moment(value?.createdAt).startOf('day').fromNow()}
              </h1>
            </div>
          </div>
          <div className="relative md:hidden">
            <div
              className="text-white bg-primary p-2 rounded-lg cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <HiDotsVertical />
            </div>
            <div
              className={`absolute z-[3] right-6 w-12 bg-white text-white drop-shadow-lg rounded-lg p-2 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
                  <button onClick={()=>document.getElementById('my_modal_3').showModal()}>
                  <div className="bg-primary w-8 h-7 mx-auto rounded-md flex items-center justify-center">
                  <IoEyeOutline className="text-md"></IoEyeOutline>
                </div>
                  </button>
              
             
              <Link onClick={() => handleUpdateRole(value)}>
                <div className="bg-primary w-8 h-7 mx-auto rounded-md flex items-center justify-center mt-2">
                  <IoCheckmark className="text-md"></IoCheckmark>
                </div>
              </Link>
              <Link onClick={()=> handleDelete(value?._id)} className="rounded-xl bg-[#433EBE]">
                <div className="bg-primary w-8 h-7 mx-auto rounded-md flex items-center justify-center mt-2">
                  <RxCross1 className="text-md"></RxCross1>
                </div>
              </Link>
            </div>
          </div>
          <section className="space-x-3 justify-center items-center hidden md:flex text-white">
            {/* <Link className="rounded-lg p-2 bg-[#433EBE]">
              <IoEyeOutline className=""></IoEyeOutline>
            </Link> */}
           <button className="rounded-lg p-2 bg-[#433EBE]" onClick={()=>document.getElementById('my_modal_3').showModal()}><IoEyeOutline className="">
                </IoEyeOutline></button>
            
            <Link onClick={() => handleUpdateRole(value)} className="rounded-lg p-2  bg-[#433EBE]">
            <IoCheckmark className=""></IoCheckmark>
          </Link>
            <Link onClick={()=> handleDelete(value?._id)} className="rounded-lg p-2 bg-[#433EBE]">
              <RxCross1 className=""></RxCross1>
            </Link>
          </section>
        </div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
   <div className="space-y-3">
   <h3 className="text-xl font-medium text-slate-700 text-center"><span className="font-bold text-black">Applicant Name: </span>{value?.name}</h3>
        <h3 className="text-xl font-medium text-slate-700 text-center"><span className="font-bold text-black">Applicant Email: </span>{value?.email}</h3>
        <h3 className="text-xl font-medium text-slate-700 text-center"><span className="font-bold text-black">Applied For: </span>{value?.title}</h3>
   </div>
  </div>
</dialog>
      </div>
    );
};

export default ApplicationsCard;